import Loader from '@/components/screens/Loader'
import { Button } from '@/components/ui/button'
import { useImagePreviewStore } from '@/store/useImagePreviewStore'
import { motion } from 'framer-motion'
import { Ellipsis, GalleryHorizontalEnd, LayoutGrid } from 'lucide-react'
import React, { useState } from 'react'

const ProfilePosts = ({ posts, user, isLoading }: { posts: any, user: any, isLoading: boolean}) => {
    const { setImageToPreview, setIsPreviewOpen } = useImagePreviewStore();
    const [postsLayout, setPostsLayout] = useState<"inline" | "grid">("inline");

    if(isLoading){
        return (
            <section className='md:w-[1000px] flex justify-center items-center h-auto mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent'>
                <Loader />
            </section>
        )
    }
    
    return (
        <section className="md:w-[1000px] h-fit mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
                <div className="flex justify-between">
                    <span className="text-lg font-bold">Activity</span>
                    <div className='flex items-center gap-2'>
                        <Button className="text-primary" variant={'outline'}>Create a post</Button>
                        <button className='text-primary cursor-pointer' onClick={() => setPostsLayout((perv) => perv === 'grid' ? 'inline' : 'grid')}>{postsLayout === 'inline' ? <LayoutGrid /> : <GalleryHorizontalEnd />}</button>
                    </div>
                </div>
                <div className={`${postsLayout === 'inline' ? 'flex' : 'grid place-items-center gap-2'} gap-3 overflow-auto mt-3`}>
                    {posts ? posts.map((post: any) => (
                        <div className={`${postsLayout === 'inline' ? 'w-full' : 'w-full'} h-auto p-3 border-2 rounded-md shadow-md`}>
                            <div className={`flex justify-between ${postsLayout === 'inline' ? 'w-96' : 'w-full'} items-center`}>
                                <div className='flex gap-2 items-center'>
                                    <img src={user?.user.avatar} className="w-12 h-12 rounded-full" />
                                    <span>{user?.user.username}</span>
                                </div>
                                <button className='cursor-pointer text-gray-400 hover:text-gray-300 transition-all'><Ellipsis /></button>
                            </div>

                            <div className="mt-3 w-full font-semibold">
                                <span>{post.title}</span>
                                <p className="line-clamp-3">{post.content}</p>
                            </div>

                            {post.images[0] ? (
                                <div className='mt-3 w-full flex justify-center'>
                                    <img onClick={() => {
                                            setImageToPreview(post.images[0].url)
                                            setIsPreviewOpen(true)
                                            console.log("preview clicked")
                                        }} 
                                         src={post.images[0].url}  
                                         alt={post.title} />
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