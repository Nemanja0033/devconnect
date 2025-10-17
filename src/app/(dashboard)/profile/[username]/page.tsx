"use client"
import ImagePreview from "@/features/post/components/ImagePreveiw";
import EditAboutModal from "@/features/user/components/EditAboutModal";
import EditAvatarModal from "@/features/user/components/EditAvatarModal";
import EditHeadingModal from "@/features/user/components/EditHeadingModal";
import ProfileAbout from "@/features/user/components/ProfileAbout";
import ProfileHeading from "@/features/user/components/ProfileHeading";
import ProfilePosts from "@/features/user/components/ProfilePosts";
import ProfileProjects from "@/features/user/components/ProfileProjects";
import { useEditForms } from "@/features/user/hooks/useEditForms";
import { useFetchUserQuery } from "@/features/user/hooks/useFetchUserQuery";
import { useUser } from "@/features/user/hooks/useUser";
import { useMePostsQuery } from "@/features/user/hooks/useMePostsQuery";
import { useMeQuery } from "@/features/user/hooks/useMeQuery"
import { useUpdateUser } from "@/features/user/hooks/useUpdateUser";
import { useUploadImages } from "@/hooks/useUploadImages";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { notFound } from "next/navigation";
 
const ProfilePage = () => {
  const { isUserProfile, rawUsername } = useUser();
  const { data: user, isLoading, isError: isErrroWithUserData } = useFetchUserQuery(rawUsername);
  const { editAboutForm, editHeadingForm } = useEditForms();
  const { uploadImages, imagesUrl, isLoading: isUploading } = useUploadImages(true);
  const { handleUpdateUser } = useUpdateUser(imagesUrl, user?.user);

  const [isHeadingEditOpen, setIsHeadingEditOpen] = useState(false);
  const [isAboutEditOpen, setIsAboutEditOpen] = useState(false);
  const [isAvatarEditOpen, setIsAvatarEditOpen] = useState(false);

  // This need to be fixed, not redirect properly
  if(isErrroWithUserData){
    return notFound();
  }

  return (
    <main className="w-full mt-54 lg:p-0 p-2 h-screen flex-col place-items-center">
        <ProfileHeading isMyProfile={isUserProfile} openAvatarEdit={() => setIsAvatarEditOpen(true)} openHeadingEdit={() => setIsHeadingEditOpen(true)} user={user} />
        <ProfileAbout isMyProfile={isUserProfile} openAboutEdit={() => setIsAboutEditOpen(true)} user={user}/>
        <ProfileProjects isMyProfile={isUserProfile} isLoading={isLoading} projects={user?.Project ?? []} user={user} />
        <ProfilePosts isMyProfile={isUserProfile} isLoading={isLoading} posts={user?.posts} user={user} />

        <FormProvider {...editHeadingForm}>
            <EditHeadingModal isHeadingEditOpen={isHeadingEditOpen} setIsHeadingEditOpen={setIsHeadingEditOpen} user={user} handleUpdateUser={handleUpdateUser} /> 
        </FormProvider>

        <FormProvider {...editAboutForm}>
            <EditAboutModal isAboutEditOpen={isAboutEditOpen} setIsAboutEditOpen={setIsAboutEditOpen} user={user} handleUpdateUser={handleUpdateUser} />
        </FormProvider>

        <EditAvatarModal isAvatarEditOpen={isAvatarEditOpen} setIsAvatarEditOpen={setIsAvatarEditOpen} isUploading={isUploading} imagesUrl={imagesUrl} handleUpdateUser={handleUpdateUser} uploadImages={uploadImages} />
        <ImagePreview />
    </main>
  )
}

export default ProfilePage