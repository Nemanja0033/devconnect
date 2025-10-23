"use client"
import { Button } from '@/components/ui/button'
import { formatDate } from '@/helpers/helper'
import { Heart, MessageCircle, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useSlugify } from '@/hooks/useSlugify'
import { useLikes } from '@/features/post/hooks/useLikes'
import { useImagePreviewStore } from '@/store/useImagePreviewStore'
import ImagePreview from '@/features/post/components/ImagePreveiw'

// THIS IS ONLY FOR DEMO PURPOSES THIS CODE NEEDS TO BE REFACTORED LATTER FOR STABLE RELASE
const Post = ({ post }: any) => {
    const { isLiked, isLikesLoading ,likes, handleLikePost} = useLikes(post);
    const { transformedSlug: slug } = useSlugify(post.author.username);
    const { setImageToPreview, setIsPreviewOpen } = useImagePreviewStore();
    
    const previewImage = () => {
        setImageToPreview(post.images[0].url);
        setIsPreviewOpen(true);
    }

    return (
            <div  className="md:w-[600px] w-full grid gap-2 h-auto bg-accent/50 hover:bg-accent/80 transition-all rounded-md p-3">
                <div className="grid gap-1">
                    <div className="flex gap-2 w-full items-center">
                        <img className="h-8 w-8 rounded-full cursor-pointer" src={post.author.avatar as string | undefined} alt={post.author.username + ' ' + 'avatar'} />
                        <Link href={`/profile/${slug}`} className="text-sm hover:underline cursor-pointer text-gray-400">{post.group ? post.group.name : post.author.username}</Link>
                        <span className='text-xs text-gray-400'>{formatDate(post.createdAt)}</span>
                    </div>
                </div>
                <div className='w-full'>
                    <Link href={`/post/${post.id}`} className='font-bold hover:underline cursor-pointer transition-all'>{post.title}</Link>
                    <p className="line-clamp-4">{post.content}</p>
                </div>

                <div className='w-full'>
                    {post.images.length > 0  && (
                        <img onClick={previewImage} className='w-full rounded-md' src={post.images[0].url} alt={post.title} />
                    )}
                </div>

                <div className='flex justify-start gap-2 items-center'>
                    {!isLikesLoading ? (
                        <>
                            <Button onClick={() => handleLikePost(post.id)} className={`hover:text-primary cursor-pointer transition-all ${isLiked ? 'text-primary' : ''}`} variant={'secondary'}><ThumbsUp size={20} strokeWidth={0.75} />{likes}</Button>
                            <Button className={`hover:text-primary cursor-pointer transition-all`} variant={'secondary'}><MessageCircle size={20} strokeWidth={0.75} /></Button>
                            <Button className='hover:text-primary cursor-pointer transition-all' variant={'secondary'}><Heart size={20} strokeWidth={0.75} /></Button>
                        </>
                    ) : (
                        <>
                            <Skeleton className='w-5 h-5' />
                            <Skeleton className='w-5 h-5' />
                            <Skeleton className='w-5 h-5' />
                        </>
                    )}
                </div>
                <ImagePreview />
            </div>
        )
    }

export default Post