import { CommentType } from '@/types/CommentType'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'lucide-react'
import React from 'react'

const Comment = ({content, date}: CommentType) => {
  return (
    <div className='w-full flex-row p-2 shadow-md border border-gray-100 rounded-md'>
        <div className='flex justify-start items-center gap-2'>
            {/* <Link className={'underline text-gray-400'}>{author.name}</Link> */}
            <span className='text-gray-400 text-xs'>{date
             ? formatDistanceToNow(new Date(date), { addSuffix: true }) 
             : null}
            </span>
        </div>
        <p>{content}</p>
    </div>
  )
}

export default Comment