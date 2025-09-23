import { Skeleton } from "@/components/ui/skeleton"

export function DraftSkeleton() {
    // based on how much drafts fit in the viewport
    const skeletons = [1,2,3,4];
  return (
      <div className="grid w-full h-full gap-1">
        {skeletons.map(() => (
            <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-20" />
                <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        ))}
      </div>
  )
}
