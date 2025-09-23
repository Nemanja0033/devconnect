"use client"
import { CreatePostForm, PostDraftType, ProjectDraftType } from "@/types";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect } from "react";

export default function PostForm({
    onSubmit, 
    saveDraft, 
    isSavingDraft, 
    savedFromDraft 
    } 
    : 
    { 
    onSubmit: () => void, 
    saveDraft: () => void, 
    isSavingDraft: boolean, 
    savedFromDraft?: PostDraftType | ProjectDraftType 
    }) {
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, errors } } = useFormContext<CreatePostForm>();
    const isFormDisabled = isSubmitting || watch("title") === "" || watch("content") === "";

    useEffect(() => {
        if (savedFromDraft) {
          reset({
            title: savedFromDraft.title,
            content: "content" in savedFromDraft ? savedFromDraft.content : ""
          });
        }
    }, [savedFromDraft, reset]);

    return(
        <form className="grid mt-3 w-full gap-5" onSubmit={handleSubmit(onSubmit)}>
                <Input defaultValue={savedFromDraft?.title} {...register('title', {
                    required: "Title is required"
                })} type="text" id="title" placeholder="Title*" className="h-12 rounded-xl" />

                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

                <Input defaultValue={savedFromDraft && "content" in savedFromDraft ? savedFromDraft.content : ''} {...register('content', {
                    required: "Content is required"
                })} type="text" id="title" placeholder="Content*" className="h-20 rounded-xl" />

                {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
                <div className="flex md:justify-end justify-center gap-3 w-full ">
                  {savedFromDraft ? null : (
                    <Button className="md:w-32 w-1/2" type="button" onClick={saveDraft} variant={'secondary'} disabled={isFormDisabled || isSavingDraft}>{isSavingDraft ? <Loader2 className="animate-spin" /> : "Save Draft"}</Button>
                  )}
                  <Button className="md:w-32 w-1/2" disabled={isFormDisabled} type="submit">{isSubmitting ? <Loader2 className="animate-spin"/> : "Submit"}</Button>
                </div>
            </form>
    )
}