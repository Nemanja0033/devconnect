import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

const CommentSection = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className='w-full grid gap-3'>
        <div className='w-full flex justify-start'>
            <span className='text-lg font-semibold'>Comments</span>
        </div>
        <hr />
        <div className='w-full relative'>
            <Textarea onFocus={() => setIsFocused(true)} className={`${isFocused && 'h-32'} max-h-32 px-5`} placeholder='Leave your comment. . .' />
            {isFocused && (
                <div className='flex items-center gap-2 absolute bottom-2 right-2'>
                    <Button onClick={() => setIsFocused(false)} className='text-white cursor-pointer' variant={'secondary'}>Cancel</Button>
                    <Button className='text-white font-semibold cursor-pointer' variant={'default'}>Comment</Button>
                </div>
            )}
        </div>
    </div>
  )
}

export default CommentSection