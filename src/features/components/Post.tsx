"use client"
import { Button } from '@/components/ui/button'
import { formatDate } from '@/helpers/helper'
import { likePost } from '@/services/post-interactions/post-interactions-service'
import { useQueryClient } from '@tanstack/react-query'
import { Heart, MessageCircle, ThumbsUp } from 'lucide-react'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// THIS IS ONLY FOR DEMO PURPOSES THIS CODE NEEDS TO BE REFACTORED LATTER FOR STABLE RELASE
const Post = ({ post }: any) => {
    const queryClient = useQueryClient();
    const [isLiked, setIsLiked] = useState<boolean | null>(null);
    const [likes, setLikes] = useState<number | null>(null);

    const handleLikePost = async (postId: string) => {
        const user = await getSession();
        if(!user) return;

        try {
            // Optimistic UI update
            setIsLiked(!isLiked);
            setLikes((prev) => (prev ?? 0) + (isLiked ? -1 : 1));

            // Call the API to like/unlike the post
            await likePost(postId);
        } catch (err) {
            // Revert the optimistic update in case of an error
            setIsLiked((prev) => !prev);
            setLikes((prev) => (prev ?? 0) + (isLiked ? 1 : -1));
            console.error("Error liking the post:", err);
        }
    };

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const session: any = await getSession();
                const userId = session?.user.id;

                if (!userId) {
                    setIsLiked(false);
                    setLikes(post.Like.length);
                    return;
                }

                const userLike = post.Like.find((like: any) => like.authorId === userId);
                setIsLiked(!!userLike);
                setLikes(post.Like.length);
            } catch (err) {
                console.error("Error fetching likes:", err);
            }
        };

        fetchLikes();
    }, [post.Like]);

    return (
            <div className="md:w-[600px] grid gap-2 h-auto bg-accent/50 hover:bg-accent/80 transition-all rounded-md p-3">
                <div className="grid gap-1">
                    <div className="flex gap-2 w-full items-center">
                        <img className="h-8 w-8 rounded-full cursor-pointer" src={post.author.avatar as string | undefined} alt={post.author.username + ' ' + 'avatar'} />
                        <Link href={`/profile/${post.author.username}`} className="text-sm hover:underline cursor-pointer text-gray-400">{post.group ? post.group.name : post.author.username}</Link>
                        <span className='text-xs text-gray-400'>{formatDate(post.createdAt)}</span>
                    </div>
                </div>
                <div className='w-full'>
                    <p className="line-clamp-4">{post.content}</p>
                </div>
                <div className='flex justify-start gap-2 items-center'>
                    <Button onClick={() => handleLikePost(post.id)} className={`hover:text-primary cursor-pointer transition-all ${isLiked ? 'text-primary' : ''}`} variant={'secondary'}><ThumbsUp size={20} strokeWidth={0.75} />{likes}</Button>
                    <Button className={`hover:text-primary cursor-pointer transition-all`} variant={'secondary'}><MessageCircle size={20} strokeWidth={0.75} /></Button>
                    <Button className='hover:text-primary cursor-pointer transition-all' variant={'secondary'}><Heart size={20} strokeWidth={0.75} /></Button>
                </div>
            </div>
        )
    }

export default Post