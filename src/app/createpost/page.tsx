"use client"
import PostForm from "@/components/forms/PostForm";
import ProjectForm from "@/components/forms/ProjectForm";
import UploadImageForm from "@/components/forms/UploadImage";
import Draft from "@/components/reusables/Draft";
import Loader from "@/components/screens/Loader";
import { Card } from "@/components/ui/card";
import { uploadToCloud } from "@/lib/uploadImage";
import { getPostDrafts, getProjecftDrafts, savePostDraft, saveProjectDraft } from "@/services/draftService";
import { createPost, createProject } from "@/services/postService";
import { CreatePostForm, CreateProjectForm, PostDraftType, ProjectDraftType } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner";

export default function CreatePost() {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [drafts, setDrafts] = useState<PostDraftType[] | ProjectDraftType[]>([]);

  const createPostForm = useForm<CreatePostForm>({ mode: "onSubmit" });
  const createProjectForm = useForm<CreateProjectForm>({ mode: "onSubmit" });

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (!newFiles || newFiles.length === 0) return;

    const newFileArray = Array.from(newFiles);
    setIsLoading(true);

    try {
      const uploadedUrls = await Promise.all(
        newFileArray.map((img) => uploadToCloud(img))
      );

      setImagesUrl((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPost = async () => {
    const { title, content } = createPostForm.getValues();
    try {
      await createPost({ title, content, images: imagesUrl });
      console.log(imagesUrl)
      toast.success("Posted successfully!");
      createPostForm.reset();
      setImagesUrl([]);
    } catch (err) {
      toast.error("Error while posting");
    }
  };

  const handleSubmitProjectPost = async () => {
    const { title, description, sourceCodeUrl, liveDemoUrl, issues } = createProjectForm.getValues();
    try {
      await createProject({ title, description, sourceUrl: sourceCodeUrl, liveUrl: liveDemoUrl, issues, images: imagesUrl });
      toast.success("Posted successfully!");
      createPostForm.reset();
      setImagesUrl([]);
    } catch (err) {
      toast.error("Error while posting");
    }
  };

  const handleRemoveUploadedImage = (url: string) => {
    setImagesUrl(imagesUrl.filter((img) => img !== url));
  }

  const handleSavePostDraft = async () => {
    setIsSavingDraft(true);
    const { title, content } = createPostForm.getValues();
    try {
      await savePostDraft({ title, content }, imagesUrl);
      toast.success("Draft saved successfully!");
      createPostForm.reset();
      setImagesUrl([]); 
    } catch (err) {
      toast.error("Error while saving draft");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSaveProjectDraft = async () => {
    setIsSavingDraft(true);
    const { title, description, sourceCodeUrl, techStack, liveDemoUrl, issues } = createProjectForm.getValues();
    try {
      await saveProjectDraft({ title, description, sourceCodeUrl, techStack, liveDemoUrl, issues }, imagesUrl);
      toast.success("Draft saved successfully!");
      createProjectForm.reset();
      setImagesUrl([]);
    } catch (err) {
      toast.error("Error while saving draft");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleGetDrafts = async () => {
    try {
      setIsLoading(true);
      const postDrafts = await getPostDrafts();
      const projectDrafts = await getProjecftDrafts();

      setDrafts([...postDrafts, ...projectDrafts]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  
  const handleTabChange = (value: string) => {
    handleGetDrafts();

    return;
  };

  return (
    <main className="flex w-full h-[80vh] p-5 justify-center items-center">
      <div className="p-5 md:w-fit h-full w-full">
        <span className="text-2xl font-semibold">Create Post</span>
        <Tabs defaultValue="post" onValueChange={handleTabChange}>
          <TabsList className="flex px-1 justify-between w-full gap-3">
           <div className="flex gap-3">
            <TabsTrigger  className="data-[state=active]:border-b-2 hover:bg-accent p-2 transition-all rounded-xs border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="post">Post</TabsTrigger>
            <TabsTrigger  className="data-[state=active]:border-b-2 hover:bg-accent p-2 transition-all rounded-xs border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="project">Project</TabsTrigger>
           </div>
            <TabsTrigger onClick={handleGetDrafts} className="ml-6 data-[state=active]:border-b-2 hover:bg-accent p-2 transition-all border-b-primary cursor-pointer hover:opacity-95 data-[state=active]:text-primary" value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent className="mt-3" value="post">
            <UploadImageForm isLoading={isLoading} removeImage={handleRemoveUploadedImage} imagesUrl={imagesUrl} onUpload={uploadImages} /> 
            
            <FormProvider {...createPostForm}>
              <PostForm isSavingDraft={isSavingDraft} saveDraft={handleSavePostDraft} onSubmit={handleSubmitPost} />
            </FormProvider>
          </TabsContent>

          <TabsContent className="mt-3" value="project">
            <UploadImageForm isLoading={isLoading} removeImage={handleRemoveUploadedImage} imagesUrl={imagesUrl} onUpload={uploadImages} /> 

            <FormProvider {...createProjectForm}>
              <ProjectForm isSavingDraft={isSavingDraft} saveDraft={handleSaveProjectDraft} onSubmit={handleSubmitProjectPost} />
                
            </FormProvider>
          </TabsContent>

          <TabsContent className="mt-3" value="drafts">
            <div className="gird gap-3 h-full place-items-center">
              {isLoading ? <Loader /> : (
                drafts.map((draft) => (
                  <Draft title={draft.title} type=""  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}