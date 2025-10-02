"use client"
import EditAboutModal from "@/features/user/components/EditAboutModal";
import EditAvatarModal from "@/features/user/components/EditAvatarModal";
import EditHeadingModal from "@/features/user/components/EditHeadingModal";
import ProfileAbout from "@/features/user/components/ProfileAbout";
import ProfileHeading from "@/features/user/components/ProfileHeading";
import ProfilePosts from "@/features/user/components/ProfilePosts";
import { useEditForms } from "@/features/user/hooks/useEditForms";
import { useMePostsQuery } from "@/features/user/hooks/useMePostsQuery";
import { useMeQuery } from "@/features/user/hooks/useMeQuery"
import { useUpdateUser } from "@/features/user/hooks/useUpdateUser";
import { useUploadImages } from "@/hooks/useUploadImages";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
 
const ProfilePage = () => {
  const { data: user, isLoading, isError: isErrroWithUserData } = useMeQuery();
  const { data: posts, isLoading: isPostsLoading, isError: isErrorWithUserPost } = useMePostsQuery();
  const { editAboutForm, editHeadingForm } = useEditForms();
  const { uploadImages, imagesUrl, isLoading: isUploading } = useUploadImages(true);
  const { handleUpdateUser } = useUpdateUser(imagesUrl, user?.user);

  const [isHeadingEditOpen, setIsHeadingEditOpen] = useState(false);
  const [isAboutEditOpen, setIsAboutEditOpen] = useState(false);
  const [isAvatarEditOpen, setIsAvatarEditOpen] = useState(false);

  return (
    <main className="w-full h-screen flex-col place-items-center">
        <ProfileHeading openAvatarEdit={() => setIsAvatarEditOpen(true)} openHeadingEdit={() => setIsHeadingEditOpen(true)} user={user} />
        <ProfileAbout openAboutEdit={() => setIsAboutEditOpen(true)} user={user}/>
        <ProfilePosts posts={posts} user={user} />

        <FormProvider {...editHeadingForm}>
            <EditHeadingModal isHeadingEditOpen={isHeadingEditOpen} setIsHeadingEditOpen={setIsHeadingEditOpen} user={user} handleUpdateUser={handleUpdateUser} /> 
        </FormProvider>

        <FormProvider {...editAboutForm}>
            <EditAboutModal isAboutEditOpen={isAboutEditOpen} setIsAboutEditOpen={setIsAboutEditOpen} user={user} handleUpdateUser={handleUpdateUser} />
        </FormProvider>

        <EditAvatarModal isAvatarEditOpen={isAvatarEditOpen} setIsAvatarEditOpen={setIsAvatarEditOpen} isUploading={isUploading} imagesUrl={imagesUrl} handleUpdateUser={handleUpdateUser} uploadImages={uploadImages} />
    </main>
  )
}

export default ProfilePage