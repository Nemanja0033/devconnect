"use client"
import { EditIcon } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
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
                <img src={data?.user.avatar} className="rounded-full border-4 border-accent w-52 h-52 cursor-pointer" alt="" />
                <div className="px-5 grid">
                    <div className="flex justify-between w-full items-center">
                    <span className="text-2xl font-semibold">{data?.user.username}</span>
                    <button><EditIcon /></button>
                    </div>
                    <span>{data?.user.title}</span>
                </div>
            </div>
        </section>

        <section className="md:w-[1000px] h-auto mt-3 border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
            <div className="w-full flex justify-between items-center">
                <span className="text-lg font-bold">About</span>
                <EditIcon />
            </div>
            <p className={`${!isReadMoreOpen ? 'line-clamp-3' : ''}`}>{data?.user.bio}</p>
            <span className="text-gray-400 cursor-pointer hover:underline" onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}>{!isReadMoreOpen ? 'Show more...' : 'Show less'}</span>
        </section>

        <section className="md:w-[1000px] h-auto mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
            <div className="flex justify-between">
                <span className="text-lg font-bold">Activity</span>
                <Button className="text-primary" variant={'outline'}>Create a post</Button>
            </div>
            <div className="flex gap-3 overflow-auto mt-3">
                {posts?.currentUserPosts.posts.map((post: any) => (
                    <div className="w-96 h-[300px] p-3 border-2 rounded-md shadow-md">
                        <div className="flex w-96 gap-2 items-center">
                            <img src={data?.user.avatar} className="w-12 h-12 rounded-full" />
                            <span>{data?.user.username}</span>
                        </div>

                        <div className="mt-3 w-full font-semibold">
                            <span>{post.title}</span>
                            <p className="line-clamp-3">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </main>
  )
}

export default page