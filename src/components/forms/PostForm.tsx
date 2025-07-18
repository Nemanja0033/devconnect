"use client"
import { CreatePostForm } from "@/types";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form"
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function PostForm({onSubmit, saveDraft, isSavingDraft } : { onSubmit: () => void, saveDraft: () => void, isSavingDraft: boolean }) {
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
                <div className="flex md:justify-end justify-center gap-3 w-full ">
                  <Button className="md:w-32 w-1/2" type="button" onClick={saveDraft} variant={'secondary'} disabled={isFormDisabled || isSavingDraft}>{isSavingDraft ? <Loader2 className="animate-spin" /> : "Save Draft"}</Button>
                  <Button className="md:w-32 w-1/2" disabled={isFormDisabled} type="submit">{isSubmitting ? <Loader2 className="animate-spin"/> : "Submit"}</Button>
                </div>
            </form>
    )
}