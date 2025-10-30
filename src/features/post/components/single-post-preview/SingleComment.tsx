import { Badge } from '@/components/ui/badge';
import { slugifyUsername } from '@/helpers/helpers';
import Link from 'next/link';
import React, { useState } from 'react'

const SingleComment = ({ comment, authorId }: any) => {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    
    return (
        <div className='p-3 w-full h-auto gird justify-start bg-accent/40 hover:bg-accent/70 transition-all rounded-md border shadow-md'>
            <div className='flex gap-2 items-center'>
                <img className='w-8 rounded-full' src={comment.author.avatar} alt={comment.author.username} />
                <Link href={`/profile/${slugifyUsername(comment.author.username)}`} className='cursor-pointer hover:underline'>{comment.author.username}</Link>
                {comment.author.id === authorId && <Badge className='text-purple-500'>Author</Badge>}
            </div>
            <div className='px-10'>
                <p onClick={() => setIsCommentOpen(!isCommentOpen)} className={`${!isCommentOpen && 'line-clamp-3'} cursor-pointer text-gray-400`}>{comment.content}</p>
            </div>
        </div>
  )
}

export default SingleComment