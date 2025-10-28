import Loader from '@/components/screens/Loader'
import { Button } from '@/components/ui/button'
import { useImagePreviewStore } from '@/store/useImagePreviewStore'
import { GalleryHorizontalEnd, LayoutGrid } from 'lucide-react'
import React, { useState } from 'react'
import PostOptions from './PostOptionsMenu'
import { deletePost } from '@/features/post/services/postService'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

const ProfilePosts = ({ isMyProfile, posts, user, isLoading }: { isMyProfile: boolean, posts: any, user: any, isLoading: boolean}) => {
    const { setImageToPreview, setIsPreviewOpen } = useImagePreviewStore();
    const [postsLayout, setPostsLayout] = useState<"inline" | "grid">("inline");
    const queryClient = useQueryClient();

    const handleDeletePost = async (id: string) => {
        if(!id) return;

        try{
            await deletePost({ id });
            queryClient.invalidateQueries({ queryKey: ["currentUserPosts"]});
            toast.success("Post succesfully deleted");
        }
        catch(err){
            toast.error("Error while deleting post");
        }
    }

    if(isLoading){
        return (
            <section className='md:w-[1000px] flex justify-center items-center h-auto mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent'>
                <Loader />
            </section>
        )
    }

    if(posts.length < 1) {
        return (
            <section className="lg:w-[1000px] w-full h-fit mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
                <div className='w-full flex items-center justify-center'>
                    <h1 className='text-primary'>No projects to show</h1>
                </div>
            </section>
        )
    }
    
    return (
        <section className="lg:w-[1000px] w-full h-fit mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
                <div className="flex justify-between">
                    <span className="text-lg font-bold">Posts</span>
                    <div className='flex items-center gap-2'>
                        {isMyProfile && <Button asChild className="text-primary" variant={'outline'}>
                            <Link href={'/createpost'}>Create a post</Link>
                        </Button> }
                        <button className='text-primary cursor-pointer' onClick={() => setPostsLayout((perv) => perv === 'grid' ? 'inline' : 'grid')}>{postsLayout === 'inline' ? <LayoutGrid /> : <GalleryHorizontalEnd />}</button>
                    </div>
                </div>
                <div className={`${postsLayout === 'inline' ? 'flex' : 'grid place-items-center gap-2'} gap-3 overflow-auto mt-3`}>
                    {posts ? posts.map((post: any) => (
                        <div className={`${postsLayout === 'inline' ? 'min-w-[300px] max-w-[300px]' : 'w-full'} h-auto p-3 border-2 rounded-md shadow-md`}>
                            <div className={`flex justify-between w-full items-center`}>
                                <div className='flex gap-2 items-center'>
                                    <img src={user?.avatar} className="w-12 h-12 rounded-full" />
                                    <span>{user?.username}</span>
                                </div>
                                {isMyProfile && <PostOptions handleDelete={() => handleDeletePost(post.id)} />}
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