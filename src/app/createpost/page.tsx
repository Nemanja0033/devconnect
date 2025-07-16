"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { uploadToCloud } from "@/lib/uploadImage";
import { CreatePostForm } from "@/types"
import { Loader2 } from "lucide-react";
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner";

export default function CreatePost() {
  const [images, setImages] = useState<File[]>([]);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createPostForm = useForm<CreatePostForm>({ mode: "onSubmit" });
  const { register, handleSubmit, formState: { isSubmitting, errors } } = createPostForm;

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (!newFiles || newFiles.length === 0) return;

    const newFileArray = Array.from(newFiles);
    setIsLoading(true);

    try {
      const uploadedUrls = await Promise.all(
        newFileArray.map((img) => uploadToCloud(img))
      );

      setImages((prev) => [...prev, ...newFileArray]);
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
    <div>
      <input type="file" multiple onChange={uploadImages} />
      {isLoading ? (
        <span className="text-2xl flex gap-2 items-center"><Loader2 className="animate-spin" /> Loading...</span>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {imagesUrl.map((url, index) => (
            <img key={index} src={url} className="w-64 h-64 object-cover rounded-md" />
          ))}
        </div>
      )}

      <Card className="max-w-md p-5">
        <form className="grid gap-5" onSubmit={handleSubmit(createPost)}>
            <Input {...register('title', {
                required: "Title is required"
            })} type="text" id="title" placeholder="Title" />

            <Input {...register('content', {
                required: "Content is required"
            })} type="text" id="title" placeholder="Title" />
            <Button type="submit">{isSubmitting ? <Loader2 className="animate-spin"/> : "Submit"}</Button>
        </form>
      </Card>
    </div>
  );
}
