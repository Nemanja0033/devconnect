import { Button } from '@/components/ui/button'
import React from 'react'

const ProfilePosts = ({ posts, user }: { posts: any, user: any}) => {
  return (
    <section className="md:w-[1000px] h-auto mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
            <div className="flex justify-between">
                <span className="text-lg font-bold">Activity</span>
                <Button className="text-primary" variant={'outline'}>Create a post</Button>
            </div>
            <div className="flex gap-3 overflow-auto mt-3">
                {posts ? posts.map((post: any) => (
                    <div className="w-96 h-auto p-3 border-2 rounded-md shadow-md">
                        <div className="flex w-96 gap-2 items-center">
                            <img src={user?.user.avatar} className="w-12 h-12 rounded-full" />
                            <span>{user?.user.username}</span>
                        </div>

                        <div className="mt-3 w-full font-semibold">
                            <span>{post.title}</span>
                            <p className="line-clamp-3">{post.content}</p>
                        </div>

                        {post.images[0] ? (
                            <div className='mt-3 w-full'>
                                <img src={post.images[0].url} alt="" />
                            </div>
                        ) : null}
                    </div>
                )) : (
                    <div className='w-full justify-center'>
                        <p className='text-primary'>*No posts for show</p>
                    </div>
                )}
            </div>
    </section>
  )
}

export default ProfilePosts