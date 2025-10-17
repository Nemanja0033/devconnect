import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Header Section */}
      <section className="md:w-[1000px] h-105 shadow-md border-2 dark:bg-accent mt-2 rounded-md relative">
        <Skeleton className="md:h-52 w-full bg-gray-600 rounded-md md:w-[999px] absolute" />
        <div className="relative left-0 top-32 flex flex-col items-center space-y-4">
          <Skeleton className="rounded-full bg-gray-600 absolute left-0 border-gray-500 border-3 w-52 h-52" />
          <div className="px-5 grid w-full space-y-2">
            <div className="flex justify-between items-center">
              {/* <Skeleton className="w-40 h-6 bg-gray-600 opacity-90" /> */}
              {/* <Skeleton className="w-6 h-6 bg-gray-600 opacity-90" /> */}
            </div>
            {/* <Skeleton className="w-60 h-4" /> */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="md:w-[1000px] h-auto mt-3 border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent space-y-4">
        <div className="flex justify-between items-center">
          {/* <Skeleton className="w-24 bg-gray-600 h-5" /> */}
          {/* <Skeleton className="w-6 bg-gray-600 h-6" /> */}
        </div>
        {/* <Skeleton className="w-full bg-gray-600 h-16 rounded-md" /> */}
        {/* <Skeleton className="w-24 bg-gray-600 h-4" /> */}
      </section>

      {/* Activity Section */}
      <section className="md:w-[1000px] h-auto mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent space-y-4">
        <div className="flex justify-between items-center">
          {/* <Skeleton className="w-24 bg-gray-600 h-5" /> */}
          <Skeleton className="w-32 bg-gray-600 h-10 rounded-md" />
        </div>
        <div className="flex gap-3 overflow-auto mt-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-96 h-[300px] p-3 border-2 rounded-md shadow-md space-y-4">
              <div className="flex gap-2 items-center">
                <Skeleton className="w-12 bg-gray-600 h-12 rounded-full" />
                <Skeleton className="w-32 bg-gray-600 h-4" />
              </div>
              <div className="space-y-2 mt-3">
                <Skeleton className="w-48 bg-gray-600 h-5" />
                <Skeleton className="w-full bg-gray-600 h-16 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
