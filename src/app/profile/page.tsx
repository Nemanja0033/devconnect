"use client"
import { coverPlaceholder } from "@/constants/constants"
import { useMePostsQuery } from "@/features/user/hooks/useMePostsQuery";
import { useMeQuery } from "@/features/user/hooks/useMeQuery"
import { useState } from "react";

const page = () => {
  const { data, isLoading } = useMeQuery();
  const { data: posts, isLoading: isPostsLoading } = useMePostsQuery();
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  return (
    <main className="w-full h-screen flex-col place-items-center">
        <section className="md:w-[1000px] h-105 shadow-md border-2 dark:bg-accent mt-2 rounded-md">
            <img src={coverPlaceholder} className="md:h-52 w-full rounded-md md:w-[999px] absolute" alt="" />
            <div className="relative top-32">
                <img src={data?.user.avatar} className="rounded-full border-4 border-accent w-52 h-52" alt="" />
                <div className="px-5 grid">
                    <span className="text-2xl font-semibold">{data?.user.username}</span>
                    <span>{data?.user.title}</span>
                </div>
            </div>
        </section>

        <section className="md:w-[1000px] h-auto mt-3 border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
            <span className="text-lg font-bold">About</span>
            <p className={`${!isReadMoreOpen ? 'line-clamp-3' : ''}`}>{data?.user.bio}</p>
            <span className="text-gray-400 cursor-pointer hover:underline" onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}>{!isReadMoreOpen ? 'Show more...' : 'Show less'}</span>
        </section>

        <section className="md:w-[1000px] h-auto mt-3 border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
            <span className="text-lg font-bold">Activity</span>
        </section>
    </main>
  )
}

export default page