"use client"
import UploadImageForm from "@/features/post/components/create-post/UploadImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDraft } from "@/features/post-drafts/hooks/useDraft";
import DraftEditModal from "@/features/post-drafts/components/DraftEditModal";
import { mapImagesToObject } from "@/features/post/lib/lib";
import DraftDeleteModal from "@/features/post-drafts/components/DraftDeleteModal";
import ImagePreveiw from "@/features/post/components/ImagePreveiw";
import { useSubmitPost } from "@/features/post/hooks/useSubmitPost";
import { useUploadImages } from "@/hooks/useUploadImages";
import DraftSection from "@/features/post/components/create-post/DraftSection";
import { CreatePostForm, CreateProjectForm } from "@/features/post/types";
import { useImagePreviewStore } from "@/store/useImagePreviewStore";
import PostForm from "@/features/post/components/create-post/PostForm";
import ProjectForm from "@/features/post/components/create-post/ProjectForm";
import UploadedImagesMap from "@/features/post/components/create-post/UploadedImagesMap";

export default function CreatePost() {
  const createPostForm = useForm<CreatePostForm>({ mode: "onSubmit" });
  const createProjectForm = useForm<CreateProjectForm>({ mode: "onSubmit" });
  const createPostFormDraft = useForm<CreatePostForm>({ mode: "onSubmit" });
  const createProjectFormDraft = useForm<CreateProjectForm>({ mode: "onSubmit" });
  const { imagesUrl, isLoading, uploadImages, handleRemoveUploadedImage, resetImages } = useUploadImages();
  const {
    currentDraft,
    isSavingDraft,
    handleDeleteDraft,
    openEditDraftModal,
    handleSavePostDraft,
    handleSaveProjectDraft,
  } = useDraft(imagesUrl, resetImages);

  const { handleSubmitPost,handleSubmitProjectPost,} = useSubmitPost(imagesUrl, resetImages, handleDeleteDraft, createPostForm, createProjectForm, createProjectFormDraft, createPostFormDraft);
  const { setIsPreviewOpen, setImageToPreview } = useImagePreviewStore();

  return (
    <main className="flex w-full h-[80vh] p-5 justify-center items-center">
      <div className="p-5 md:w-fit h-full border-2 dark:bg-accent overflow-auto shadow-md rounded-md w-full">
        <span className="text-2xl font-semibold">Create Post</span>
        <Tabs defaultValue="post">
          <TabsList className="flex px-1 justify-between w-full gap-3">
           <div className="flex gap-3">
            <TabsTrigger  className="data-[state=active]:border-b-2 data-[state=active]:bg-accent hover:bg-accent p-2 transition-all rounded-xs border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="post">Post</TabsTrigger>
            <TabsTrigger  className="data-[state=active]:border-b-2 data-[state=active]:bg-accent hover:bg-accent p-2 transition-all rounded-xs border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="project">Project</TabsTrigger>
           </div>
            <TabsTrigger className="ml-6 data-[state=active]:border-b-2 data-[state=active]:bg-accent hover:bg-accent p-2 transition-all border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="drafts">Drafts</TabsTrigger>
          </TabsList>

          {/* Posts tab */}
          <TabsContent className="mt-3" value="post">
            <UploadImageForm onUpload={uploadImages} /> 
            <UploadedImagesMap setIsPreviewOpen={setIsPreviewOpen} setImageToPreview={setImageToPreview} isLoading={isLoading} imagesUrl={mapImagesToObject(imagesUrl)} removeImage={handleRemoveUploadedImage} />
            
            <FormProvider {...createPostForm}>
              <PostForm onSubmit={handleSubmitPost} saveDraft={() => handleSavePostDraft(createPostForm)} isSavingDraft={isSavingDraft} />
            </FormProvider>
          </TabsContent>

          {/* Project tab */}
          <TabsContent className="mt-3" value="project">
            <UploadImageForm onUpload={uploadImages} /> 
            <UploadedImagesMap setIsPreviewOpen={setIsPreviewOpen} setImageToPreview={setImageToPreview} isLoading={isLoading} imagesUrl={mapImagesToObject(imagesUrl)} removeImage={handleRemoveUploadedImage} />

            <FormProvider {...createProjectForm}>
              <ProjectForm isSavingDraft={isSavingDraft} saveDraft={() => handleSaveProjectDraft(createProjectForm)} onSubmit={handleSubmitProjectPost} />
                
            </FormProvider>
          </TabsContent>

          {/* Drafts tab */}
          <TabsContent className="mt-3 md:w-[530px]" value="drafts">
            <DraftSection openEditDraftModal={openEditDraftModal} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Draft Edit Modal */}
      <DraftEditModal 
        currentDraft={currentDraft} 
        createPostFormDraft={createPostFormDraft} 
        createProjectFormDraft={createProjectFormDraft} 
        isSavingDraft={isSavingDraft} 
        isUploadedPhotosLoading={isLoading}
        handleRemoveUploadedImage={handleRemoveUploadedImage}
        handleSubmitProjectPost={handleSubmitProjectPost} 
        handleSavePostDraft={handleSavePostDraft} 
        handleSubmitPost={handleSubmitPost}
        setImageToPreview={setImageToPreview} 
        setIsPreviewOpen={setIsPreviewOpen}
      />

      {/* Delete Draft Modal */}
      <DraftDeleteModal currentDraft={currentDraft} handleDeleteDraft={handleDeleteDraft} 
      />

      {/* Uploaded image preview */}
      <ImagePreveiw />
    </main>
  );
}