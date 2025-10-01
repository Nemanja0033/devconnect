"use client"
import Loader from "@/components/screens/Loader";
import { EditIcon } from "@/components/shared/Icons";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { coverPlaceholder } from "@/constants/constants"
import UploadImageForm from "@/features/post/components/UploadImage";
import { useMePostsQuery } from "@/features/user/hooks/useMePostsQuery";
import { useMeQuery } from "@/features/user/hooks/useMeQuery"
import { useUploadImages } from "@/hooks/useUploadImages";
import { updateUser } from "@/services/user/userService";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface EditHeadingForm {
    username?: string,
    title?: string
}

interface EditAboutForm {
    bio?: string
}

const page = () => {
  const { data: user, isLoading } = useMeQuery();
  const { data: posts, isLoading: isPostsLoading } = useMePostsQuery();
  const queryClient = useQueryClient();
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  // state for modals
  const [isHeadingEditOpen, setIsHeadingEditOpen] = useState(false);
  const [isAboutEditOpen, setIsAboutEditOpen] = useState(false);
  const [isAvatarEditOpen, setIsAvatarEditOpen] = useState(false);

  const editHeadingForm = useForm<EditHeadingForm>({ mode: 'onSubmit' });
  const { handleSubmit, register, formState: { errors } } = editHeadingForm;

  const editAboutForm = useForm<EditAboutForm>({ mode: "onSubmit" });
  const { handleSubmit: handleAboutSubmit, register: registerAboutForm } = editAboutForm;

  const isSingleImageUploading = true;
  const { uploadImages, imagesUrl, isLoading: isUploading } = useUploadImages(isSingleImageUploading);

  const onSubmit = async (data?: EditHeadingForm | EditAboutForm) => {
    try {
      // If we pass data - we are updating Heading or About then run this block.   
      if(data){
        if ('username' in data && (data.username === user?.user.username)) {
            console.log('No username were changed.');
            delete data.username;
        }

        if('title' in data && (data.title === user?.user.title)){
            console.log('No title were changed');
            delete data.title;
        }
    
        if('bio' in data && (data.bio === user?.user.bio)){
            console.log('About not changed');
            delete data.bio;
        }

        if(Object.keys(data).length === 0){
            console.log("Nothing were changed");
            return;
        }
        const updatedUser = await updateUser(data);
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        setIsHeadingEditOpen(false);
        setIsAboutEditOpen(false);
      }
      
      // If we are updaing avatar
      if(imagesUrl !== undefined && imagesUrl.length > 0){
        const updateData: any = {};
        updateData.avatar = imagesUrl[0];
        await updateUser(updateData);
        queryClient.invalidateQueries({ queryKey: ['currentUser']});
        setIsAvatarEditOpen(false);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <main className="w-full h-screen flex-col place-items-center">
        <section className="md:w-[1000px] h-105 shadow-md border-2 dark:bg-accent mt-2 rounded-md">
            <img src={coverPlaceholder} className="md:h-52 w-full rounded-md md:w-[999px] absolute" alt="" />
            <div className="relative top-32">
                <img onClick={() => setIsAvatarEditOpen(true)} src={user?.user.avatar} className="rounded-full border-4 border-accent w-52 h-52 cursor-pointer" alt="" />
                <div className="px-5 grid">
                    <div className="flex justify-between w-full items-center">
                    <span className="text-2xl font-semibold">{user?.user.username}</span>
                    <button onClick={() => setIsHeadingEditOpen(true)}><EditIcon /></button>
                    </div>
                    <span>{user?.user.title}</span>
                </div>
            </div>
        </section>

        <section className="md:w-[1000px] h-auto mt-3 border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
            <div className="w-full flex justify-between items-center">
                <span className="text-lg font-bold">About</span>
                <button onClick={() => setIsAboutEditOpen(true)}><EditIcon /></button>
            </div>
            <p className={`${!isReadMoreOpen ? 'line-clamp-3' : ''}`}>{user?.user.bio}</p>
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
                            <img src={user?.user.avatar} className="w-12 h-12 rounded-full" />
                            <span>{user?.user.username}</span>
                        </div>

                        <div className="mt-3 w-full font-semibold">
                            <span>{post.title}</span>
                            <p className="line-clamp-3">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

     <AlertDialog open={isHeadingEditOpen} onOpenChange={setIsHeadingEditOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Edit intro</AlertDialogTitle>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <Label className="text-primary text-sm" htmlFor="username">*Username</Label>
                    <Input {...register('username')} id="username" defaultValue={user?.user.username} />
                    <Label className="text-primary text-sm" htmlFor="title">*Title</Label>
                    <Input {...register("title")} id="title" defaultValue={user?.user.title} />
                    <div className="w-full flex justify-end mt-3 gap-2 items-center">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </AlertDialogHeader>
            <AlertDialogFooter>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

    <AlertDialog open={isAboutEditOpen} onOpenChange={setIsAboutEditOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Edit about</AlertDialogTitle>
                <form onSubmit={handleAboutSubmit(onSubmit)}>
                    <Label htmlFor="about" className="text-primary text-sm">*About</Label>
                    <Textarea {...registerAboutForm('bio')} defaultValue={user?.user.bio} id="about" />
                    <div className="w-full justify-end items-center gap-2 mt-3">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button type="submit">Save</Button>                        
                    </div>
                </form>
            </AlertDialogHeader>
            <AlertDialogFooter>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <AlertDialog open={isAvatarEditOpen} onOpenChange={setIsAvatarEditOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Change Avatar</AlertDialogTitle>
                <UploadImageForm isInModal={true} onUpload={uploadImages} />
                <div className="flex justify-center items-center w-full mt-2">
                    {isUploading ? <Loader /> : imagesUrl.length > 0 && (
                        <div>
                            <img src={imagesUrl[0]} className="w-32 h-32 rounded-full" />
                            <span className="text-primary text-sm">*Avatar succesfully uploaded!</span>
                        </div>
                    )}
                </div>
                <div className="w-full flex justify-end mt-3 gap-2 items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={() => onSubmit()}>Save</Button>
                </div>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
    </main>
  )
}

export default page