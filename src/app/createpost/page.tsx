"use client"
import ProjectForm from "@/app/createpost/_components/ProjectForm";
import UploadImageForm from "@/app/createpost/_components/UploadImage";
import UploadedImagesMap from "@/app/createpost/_components/UploadedImagesMap";
import { DraftSkeleton } from "@/app/createpost/_components/DraftSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react"
import { FormProvider } from "react-hook-form"
import Draft from "./_components/Draft";
import PostForm from "./_components/PostForm";
import { useUploadImages } from "./_hooks/useUploadImages";
import { useDraft } from "./_hooks/useDraft";
import { useSubmitPost } from "./_hooks/useSubmitPost";
import DraftEditModal from "./_components/DraftEditModal";
import DraftDeleteModal from "./_components/DraftDeleteModal";
import ImagePreveiw from "./_components/ImagePreveiw";

export default function CreatePost() {
  const { 
    imagesUrl, 
    isLoading, 
    uploadImages, 
    handleRemoveUploadedImage, 
    resetImages 
  } = useUploadImages();
  const {
    drafts,
    currentDraft,
    isSavingDraft,
    isDeleteDraftModalOpen,
    isDraftModalOpen,
    isLoading : isDraftsLoading,
    setIsDraftModalOpen,
    handleGetDrafts,
    setIsDeleteDraftModalOpen,
    setCurrentDraft,
    handleDeleteDraft,
    openEditDraftModal,
    handleSavePostDraft,
    handleSaveProjectDraft,
  } = useDraft(imagesUrl, resetImages);

  const {
    createPostForm,
    createProjectForm,
    handleSubmitPost,
    handleSubmitProjectPost,
  } = useSubmitPost(imagesUrl, currentDraft, resetImages, handleDeleteDraft);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageToPreview, setImageToPreview] = useState('');

  const handleTabChange = (value: string) => {
    if(value === "drafts"){
      handleGetDrafts();
    }

    return;
  };

  return (
    <main className="flex w-full h-[80vh] p-5 justify-center items-center">
      <div className="p-5 md:w-fit h-full border-2 shadow-md rounded-md w-full">
        <span className="text-2xl font-semibold">Create Post</span>
        <Tabs defaultValue="post"  onValueChange={handleTabChange}>
          <TabsList className="flex px-1 justify-between w-full gap-3">
           <div className="flex gap-3">
            <TabsTrigger  className="data-[state=active]:border-b-2 data-[state=active]:bg-accent hover:bg-accent p-2 transition-all rounded-xs border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="post">Post</TabsTrigger>
            <TabsTrigger  className="data-[state=active]:border-b-2 data-[state=active]:bg-accent hover:bg-accent p-2 transition-all rounded-xs border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="project">Project</TabsTrigger>
           </div>
            <TabsTrigger onClick={handleGetDrafts} className="ml-6 data-[state=active]:border-b-2 data-[state=active]:bg-accent hover:bg-accent p-2 transition-all border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="drafts">Drafts</TabsTrigger>
          </TabsList>

          {/* Posts tab */}
          <TabsContent className="mt-3" value="post">
            <UploadImageForm onUpload={uploadImages} /> 
            <UploadedImagesMap isLoading={isLoading} imagesUrl={imagesUrl} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} />
            
            <FormProvider {...createPostForm}>
              <PostForm onSubmit={handleSubmitPost} saveDraft={() => handleSavePostDraft(createPostForm)} isSavingDraft={isSavingDraft} />
            </FormProvider>
          </TabsContent>

          {/* Project tab */}
          <TabsContent className="mt-3" value="project">
            <UploadImageForm onUpload={uploadImages} /> 
            <UploadedImagesMap isLoading={isLoading} imagesUrl={imagesUrl} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} />

            <FormProvider {...createProjectForm}>
              <ProjectForm isSavingDraft={isSavingDraft} saveDraft={() => handleSaveProjectDraft(createProjectForm)} onSubmit={handleSubmitProjectPost} />
                
            </FormProvider>
          </TabsContent>

          {/* Drafts tab */}
          <TabsContent className="mt-3 md:w-[530px]" value="drafts">
            <div className="w-full h-96 overflow-auto">
              {isDraftsLoading && drafts.length < 1 ? <DraftSkeleton /> : (
                drafts.map((draft) => (
                  <div className="w-full mt-3" key={draft.id}>
                    <Draft onEditClick={() => openEditDraftModal(draft.id)} 
                           onDeleteClick={() => {
                            setIsDeleteDraftModalOpen(true);
                            setCurrentDraft(draft);
                           }}
                           title={draft.title} 
                           type={draft.type} 
                    />
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Draft Edit Modal */}
      <DraftEditModal 
        isDraftModalOpen={isDraftModalOpen} 
        currentDraft={currentDraft} 
        createPostForm={createPostForm} 
        createProjectForm={createProjectForm} 
        isSavingDraft={isSavingDraft} 
        setIsDraftModalOpen={setIsDraftModalOpen} 
        handleSubmitProjectPost={handleSubmitProjectPost} 
        handleSavePostDraft={handleSavePostDraft} 
        handleSubmitPost={handleSubmitPost} 
      />

      {/* Delete Draft Modal */}
      <DraftDeleteModal 
        isDeleteDraftModalOpen={isDeleteDraftModalOpen} 
        currentDraft={currentDraft} 
        setIsDeleteDraftModalOpen={setIsDeleteDraftModalOpen} 
        handleDeleteDraft={handleDeleteDraft} 
      />

      {/* Uploaded image preview */}
      <ImagePreveiw isPreviewOpen={isPreviewOpen} setIsPreviewOpen={setIsPreviewOpen} imageToPreview={imageToPreview} />
    </main>
  );
}