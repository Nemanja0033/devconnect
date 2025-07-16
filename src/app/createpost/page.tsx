"use client"
import PostForm from "@/components/forms/PostForm";
import UploadImageForm from "@/components/forms/UploadImage";
import { Card } from "@/components/ui/card";
import { uploadToCloud } from "@/lib/uploadImage";
import { CreatePostForm } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Loader2 } from "lucide-react";
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner";

export default function CreatePost() {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createPostForm = useForm<CreatePostForm>({ mode: "onSubmit" });

  const { register, handleSubmit, formState: { isSubmitting, errors } } = createPostForm;

  const isFormDisabled = isSubmitting || isLoading || createPostForm.watch("title") === "" || createPostForm.watch("content") === "";

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

  const createPost = async () => {
    try{
        const { title, content } = createPostForm.getValues();
        const res = await fetch('api/posts', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                content,
                images: imagesUrl
            })
        });

        if(!res.ok){
            toast.error("Error while posting");
        }

        if(res.ok){
            toast.success("Posted Sucessfully");
        }
    }
    catch(err){
        console.log("error", err);
    }
  }

  return (
    <main className="flex w-full h-[80vh] p-5 justify-center items-center">
      <Card className="p-5 md:w-1/3 w-full grid gap-5">
        <Tabs defaultValue="post">
          <TabsList className="flex gap-3">
            <TabsTrigger  className="data-[state=active]:border-b-2 data-[state=active]:text-primary" value="post">Post</TabsTrigger>
            <TabsTrigger  className="data-[state=active]:border-b-2 data-[state=active]:text-primary" value="project">Project</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-3" value="post">
          <UploadImageForm onUpload={uploadImages} /> 
          {isLoading ? (
              <span className="text-2xl flex gap-2 items-center"><Loader2 className="animate-spin" /></span> ) : (
              <div className="flex overflow-auto gap-4 mt-4">
                {imagesUrl.map((url, index) => (
                  <img key={index} src={url} className="w-32 z-[9999] hover:opacity-80 cursor-pointer h-32 object-cover rounded-md" />
                ))}
              </div>
          )}
          <FormProvider {...createPostForm}>
            <PostForm onSubmit={createPost} />
          </FormProvider>

          </TabsContent>

          <TabsContent value="project">
            <form className="grid mt-3 w-full gap-5">
              <UploadImageForm onUpload={uploadImages} />
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </main>
  );
}
