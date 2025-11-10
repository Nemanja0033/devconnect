"use client"
import ImagePreview from "@/features/post/components/ImagePreveiw";
import EditAvatarModal from "@/features/user/components/modals/EditAvatarModal";
import ProfileAbout from "@/features/user/components/ProfileAbout";
import ProfileHeading from "@/features/user/components/ProfileHeading";
import ProfilePosts from "@/features/user/components/ProfilePosts";
import ProfileProjects from "@/features/user/components/ProfileProjects";
import { useEditForms } from "@/features/user/hooks/useEditForms";
import { useFetchUserQuery } from "@/features/user/hooks/useFetchUserQuery";
import { useUser } from "@/features/user/hooks/useUser";
import { useUpdateUser } from "@/features/user/hooks/useUpdateUser";
import { useUploadImages } from "@/hooks/useUploadImages";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import UserNotFound from "../../../../features/user/components/UserNotFound";
import EditAboutModal from "@/features/user/components/modals/EditAboutModal";
import EditHeadingModal from "@/features/user/components/modals/EditHeadingModal";
import GlobalLoader from "@/components/screens/GlobalLoader";
 
const ProfilePage = () => {
  const { isUserProfile, rawUsername } = useUser();
  const { data: user, isLoading, isError: isErrroWithUserData, isEnabled } = useFetchUserQuery(rawUsername);
  const { editAboutForm, editHeadingForm } = useEditForms();
  const { uploadImages, imagesUrl, isLoading: isUploading } = useUploadImages(true);
  const { loading: isUserUpdating, handleUpdateUser } = useUpdateUser(imagesUrl, rawUsername);
  const [isHeadingEditOpen, setIsHeadingEditOpen] = useState(false);
  const [isAboutEditOpen, setIsAboutEditOpen] = useState(false);
  const [isAvatarEditOpen, setIsAvatarEditOpen] = useState(false);

  if(isErrroWithUserData){
    return <UserNotFound />
  }

  if(isLoading || !isEnabled){
    return <GlobalLoader />
  }

  return (
    <main className="w-full mt-54 lg:p-0 p-2 h-screen flex-col place-items-center">
        {isUserUpdating && <GlobalLoader />}
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