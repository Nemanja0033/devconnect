"use client"
import { Skeleton } from "@/components/ui/skeleton"

export function DraftSkeleton() {
  const skeletons = Array(5).fill('');
  
  return (
      <div className="grid w-full gap-1 h-full">
        {skeletons.map((_, i) => (
            <div key={i} className="flex h-20 border-2 rounded-md p-3 mt-2 w-full items-center justify-between space-x-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-10" />
                </div>
                
                <div className="flex gap-2 items-center">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
            </div>
        ))}
      </div>
  )
}
