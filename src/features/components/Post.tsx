"use client"
import { Button } from '@/components/ui/button'
import { formatDate } from '@/helpers/helper'
import { likePost } from '@/services/post-interactions/post-interactions-service'
import { useQueryClient } from '@tanstack/react-query'
import { Heart, MessageCircle, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const Post = ({ post }: any) => {
    const queryClient = useQueryClient();
    const [isLiked, setIsLiked] = useState(false);

    const handleLikePost = async (postId: string) => {
        try{
            setIsLiked(true);
            await likePost(postId);
            queryClient.invalidateQueries({ queryKey: ['posts']});
        }
        catch(err){
            setIsLiked(false);
            console.log(err);
        }
    }
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
                    <Button onClick={() => handleLikePost(post.id)} className={`hover:text-primary cursor-pointer transition-all ${isLiked ? 'text-primary' : ''}`} variant={'secondary'}><ThumbsUp size={20} strokeWidth={0.75} />{post.Like.length}</Button>
                    <Button className={`hover:text-primary cursor-pointer transition-all`} variant={'secondary'}><MessageCircle size={20} strokeWidth={0.75} /></Button>
                    <Button className='hover:text-primary cursor-pointer transition-all' variant={'secondary'}><Heart size={20} strokeWidth={0.75} /></Button>
                </div>
            </div>
        )
    }

export default Post