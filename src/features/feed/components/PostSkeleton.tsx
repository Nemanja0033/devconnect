import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const PostSkeleton = () => {
  return (
    <Skeleton className="md:w-[600px] h-44 gap-2 bg-accent/70 transition-all rounded-md p-3">
      <div className="grid gap-1">
        <div className="flex gap-2 w-full items-center">
          <Skeleton className="h-8 w-8 rounded-full cursor-pointer" />
        </div>
      </div>
    </Skeleton>
  )
}

export default PostSkeleton