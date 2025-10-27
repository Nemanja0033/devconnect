import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ThumbsUp, MessageCircle, Heart } from 'lucide-react'
import React from 'react'

const PostInteractionsBar = ({ isInteractionsLoading, handleLikePost, likes, isLiked, post }: { post: any, isLiked: boolean, isInteractionsLoading: boolean, handleLikePost: (id: string) => void, likes: number}) => {
  return (
    <div className='flex justify-start gap-2 items-center'>
        {!isInteractionsLoading ? (
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
  )
}

export default PostInteractionsBar