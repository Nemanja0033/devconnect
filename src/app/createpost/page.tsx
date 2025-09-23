"use client"
import PostForm from "@/components/forms/PostForm";
import ProjectForm from "@/components/forms/ProjectForm";
import UploadImageForm from "@/components/forms/UploadImage";
import Draft from "@/components/reusables/Draft";
import Loader from "@/components/screens/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { uploadToCloud } from "@/lib/uploadImage";
import { getPostDrafts, getProjecftDrafts, savePostDraft, saveProjectDraft } from "@/services/draftService";
import { createPost, createProject } from "@/services/postService";
import { CreatePostForm, CreateProjectForm, DraftType, PostDraftType, ProjectDraftType } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [drafts, setDrafts] = useState<PostDraftType[] | ProjectDraftType[]>([]);
  
  // Drafts modal state
  const [draftEditType, setDraftEditType] = useState<DraftType | string>();
  const [currentDraft, setCurrentDraft] = useState<PostDraftType | ProjectDraftType>();
  const [isDeleteDraftModalOpen, setIsDeleteDraftModalOpen] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

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
      await createProject({ 
        title, 
        description, 
        sourceUrl: sourceCodeUrl, 
        liveUrl: liveDemoUrl, 
        issues, 
        images: imagesUrl });
        
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
    const { 
      title, 
      description, 
      sourceCodeUrl, 
      techStack, 
      liveDemoUrl, 
      issues 
    } = createProjectForm.getValues();
      
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

      // merge drafts 
      setDrafts([...postDrafts, ...projectDrafts]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    finally{
      setIsLoading(false);
    }
  };
  
  // split fetch of drafts only when drafts is clicked
  const handleTabChange = (value: string) => {
    if(value === "drafts"){
      handleGetDrafts();
    }

    return;
  };

  // TODO draft delete functionality

  const handleDeleteDraft = async (draftId: string) => {
    try {
      setIsDeleteDraftModalOpen(false);

      toast.success("Draft deleted successfully!");
    } catch (err) {
      toast.error("Error while deleting draft");
    }
  };

  // function to handle opening modal and displaying current data of saved draft.
  const openEditDraftModal = (draftType: DraftType | undefined, draftId: string) => {
    const rawDraft = drafts.filter((x) => x.id === draftId);
    const draft = rawDraft[0];
    console.log(rawDraft)
    if(!draft) return;
    setDraftEditType(draftType);
    setCurrentDraft(draft)
    setIsDraftModalOpen(true);
  }

  return (
    <main className="flex w-full h-[80vh] p-5 justify-center items-center">
      <div className="p-5 md:w-fit h-full w-full">
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
            <UploadImageForm isLoading={isLoading} removeImage={handleRemoveUploadedImage} imagesUrl={imagesUrl} onUpload={uploadImages} /> 
            
            <FormProvider {...createPostForm}>
              <PostForm isSavingDraft={isSavingDraft} saveDraft={handleSavePostDraft} onSubmit={handleSubmitPost} />
            </FormProvider>
          </TabsContent>

          {/* Project tab */}
          <TabsContent className="mt-3" value="project">
            <UploadImageForm isLoading={isLoading} removeImage={handleRemoveUploadedImage} imagesUrl={imagesUrl} onUpload={uploadImages} /> 

            <FormProvider {...createProjectForm}>
              <ProjectForm isSavingDraft={isSavingDraft} saveDraft={handleSaveProjectDraft} onSubmit={handleSubmitProjectPost} />
                
            </FormProvider>
          </TabsContent>

          {/* Drafts tab */}
          <TabsContent className="mt-3 md:w-[530px]" value="drafts">
            <div className="grid gap-3 w-full h-full place-items-center">
              {isLoading && drafts.length < 1 ? <Loader /> : (
                drafts.map((draft) => (
                  <div className="w-full cursor-pointer" key={draft.id}>
                    <Draft onEditClick={() => openEditDraftModal(draft.type, draft.id)} title={draft.title} type={draft.type} />
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit draft modal */}
      <AlertDialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit {currentDraft?.title}</AlertDialogTitle>
          </AlertDialogHeader>

          {draftEditType === "CLASSIC" && (
            <FormProvider {...createPostForm}>
              <PostForm
                isSavingDraft={isSavingDraft}
                saveDraft={handleSavePostDraft}
                savedFromDraft={currentDraft}
                onSubmit={handleSubmitPost}
              />
            </FormProvider>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


    {/* Delete Draft Modal */}
    <AlertDialog open={isDeleteDraftModalOpen} onOpenChange={setIsDeleteDraftModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </main>
  );
}