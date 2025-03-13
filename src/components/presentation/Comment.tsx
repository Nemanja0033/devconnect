import { CommentType } from '@/types/CommentType'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'lucide-react'
import React from 'react'

const Comment = ({content, author, date}: CommentType) => {
  return (
    <div className='w-full flex-row p-2'>
        <div className='flex justify-start items-center gap-2'>
            <Link className={'underline text-gray-400'} href={`/user/${author.id}`}>{author.name}</Link>
            <span className='text-gray-400'>{date
             ? formatDistanceToNow(new Date(date), { addSuffix: true }) 
             : null}
            </span>
        </div>
    </div>
  )
}

export default Comment