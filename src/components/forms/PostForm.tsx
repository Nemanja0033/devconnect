"use client"
import { CreatePostForm } from "@/types";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UploadImageForm from "./UploadImage";

export default function PostForm({onSubmit} : { onSubmit: () => void }){
    const { register, handleSubmit, watch, formState: { isSubmitting, errors } } = useFormContext<CreatePostForm>();
    const isFormDisabled = isSubmitting || watch("title") === "" || watch("content") === "";

    return(
        <form className="grid mt-3 w-full gap-5" onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('title', {
                    required: "Title is required"
                })} type="text" id="title" placeholder="Title*" />

                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

                <Input {...register('content', {
                    required: "Content is required"
                })} type="text" id="title" placeholder="Content*" />

                {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
                <div className="flex justify-end gap-3">
                  <Button variant={'secondary'} disabled={isFormDisabled}>Save Draft</Button>
                  <Button disabled={isFormDisabled} type="submit">{isSubmitting ? <Loader2 className="animate-spin"/> : "Submit"}</Button>
                </div>
            </form>
    )
}