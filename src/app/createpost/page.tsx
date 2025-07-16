"use client"
import PostForm from "@/components/forms/PostForm";
import UploadImageForm from "@/components/forms/UploadImage";
import { Card } from "@/components/ui/card";
import { uploadToCloud } from "@/lib/uploadImage";
import { CreatePostForm } from "@/types"
import { Post } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import axios from "axios";
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

  const removeUploadedImage = (url: string) => {
    setImagesUrl(imagesUrl.filter((img) => img !== url));
  }

  const saveDraft = async () => {
    try{
      const { title, content } = createPostForm.getValues();
      await axios.post('api/draft', {
        title,
        content,
        imagesUrl
      })
      .then((res) => {
        toast.success(res.statusText);
        createPostForm.reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error while saving draft");
      })
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <main className="flex w-full h-[80vh] p-5 justify-center items-center">
      <Card className="p-5 md:w-fit w-full grid gap-5">
        <Tabs defaultValue="post">
          <TabsList className="flex gap-3">
            <TabsTrigger  className="data-[state=active]:border-b-2 data-[state=active]:text-primary" value="post">Post</TabsTrigger>
            <TabsTrigger  className="data-[state=active]:border-b-2 data-[state=active]:text-primary" value="project">Project</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-3" value="post">
          <UploadImageForm onUpload={uploadImages} /> 
          {isLoading ? (
              <span className="text-2xl w-full flex gap-2 justify-center items-center"><Loader2 className="animate-spin" /></span> ) : (
              <div className="flex overflow-auto gap-4 mt-4">
                {imagesUrl.map((url, index) => (
                  <div>
                    <button onClick={() => removeUploadedImage(url)} aria-label="remove uploaded image" className="absolute ml-2 hover:scale-110 text-red-500 transition-all z-20 cursor-pointer">X</button>
                    <img key={index} src={url} className="w-32 z-10 border-2 hover:opacity-80 h-32 object-cover rounded-md" />
                  </div>
                ))}
              </div>
          )}
          <FormProvider {...createPostForm}>
            <PostForm saveDraft={saveDraft} onSubmit={createPost} />
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
