import { Button } from '@/components/ui/button';
import { useImagePreviewStore } from '@/store/useImagePreviewStore';
import React from 'react'
import PostOptions from './PostOptionsMenu';
import { useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '@/features/post/services/projectService';
import { toast } from 'sonner';
import Loader from '@/components/screens/Loader';

const ProfileProjects = ({ isMyProfile, projects, user, isLoading }: { isMyProfile: boolean, projects: any, user: any, isLoading: boolean}) => {
    const { setImageToPreview, setIsPreviewOpen } = useImagePreviewStore();
    const queryClient = useQueryClient();

    if(!projects) return;

    if(isLoading){
        return (
            <section className='md:w-[1000px] flex justify-center items-center h-auto mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent'>
                <Loader />
            </section>
        )
    }

    if(projects.length < 1) {
        return (
            <section className="lg:w-[1000px] w-full h-fit mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
                <div className='w-full flex items-center justify-center'>
                    <h1 className='text-primary'>No projects to show</h1>
                </div>
            </section>
        )
    }

    const handleDeleteProject = async (id: string) => {
        if(!id) return;

        try{
            await deleteProject({ id });
            queryClient.invalidateQueries({ queryKey: ["currentUserPosts"]});
            toast.success("Project succesfully deleted");
        }
        catch(err){
            toast.error("Error while deleting project");
        }
    }

    return (
        <section className="lg:w-[1000px] w-full h-fit mt-3 overflow-auto border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
                <div className="flex justify-between">
                    <span className="text-lg font-bold">Projects</span>
                </div>
                <div className={`flex place-items-start gap-2 overflow-auto mt-3`}>
                    {projects ? projects.map((project: any) => (
                        <div key={project.id} className={`min-w-64 max-w-64 h-auto p-3 border-2 rounded-md shadow-md`}>
                            <div className={`flex justify-between w-full items-center`}>
                                <span>{project.title}</span>    
                                {isMyProfile && <PostOptions handleDelete={() => handleDeleteProject(project.id)} />}
                            </div>

                            <div className="mt-3 w-full font-semibold">
                                <p className="line-clamp-3">{project.content}</p>
                            </div>

                            {project.images[0] ? (
                                <div className='mt-3 w-full flex justify-center'>
                                    <img onClick={() => {
                                            setImageToPreview(project.images[0].url)
                                            setIsPreviewOpen(true)
                                            console.log("preview clicked")
                                        }} 
                                         src={project.images[0].url}  
                                         alt={project.title} />
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

export default ProfileProjects