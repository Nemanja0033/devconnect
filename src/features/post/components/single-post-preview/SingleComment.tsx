import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMeQuery } from '@/features/user/hooks/useMeQuery';
import { formatDate, slugifyUsername } from '@/helpers/helpers';
import { Comment } from '@/types';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const SingleComment = ({ comment, authorId, deleteComment }: { comment: Comment, authorId: string, deleteComment: () => void }) => {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const { data: CurrentUserData } = useMeQuery();
    return (
        <div className='p-3 w-full h-auto gird justify-start bg-accent/40 hover:bg-accent/70 transition-all rounded-md border shadow-md'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <img className='w-8 rounded-full' src={comment.author.avatar} alt={comment.author.username} />
                    <Link href={`/profile/${slugifyUsername(comment.author.username)}`} className='cursor-pointer hover:underline'>{comment.author.username}</Link>
                    <span className='text-gray-600 text-sm'>{formatDate(comment.createdAt)}</span>
                    {comment.author.id === authorId && <Badge className='text-white'>Author</Badge>}
                </div>
                {comment.authorId === CurrentUserData?.user?.id && (
                    <Button onClick={deleteComment} variant={'destructive'} size={'sm'}><Trash2 /></Button>
                )}
            </div>
            <div className='px-10'>
                <p onClick={() => setIsCommentOpen(!isCommentOpen)} className={`${!isCommentOpen && 'line-clamp-3'} cursor-pointer text-gray-400`}>{comment.content}</p>
            </div>
        </div>
  )
}

export default SingleComment