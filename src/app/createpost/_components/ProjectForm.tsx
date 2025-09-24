import { CreateProjectForm, ProjectDraftType } from "@/types";
import { useFormContext } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import ErrorTooltip from "../../../components/reusables/FormErrorTooltip";
import { useEffect } from "react";
import { Label } from "@radix-ui/react-label";

export default function ProjectForm({ onSubmit, saveDraft, isSavingDraft, savedFromDraft }: { isSavingDraft?: boolean, saveDraft?: (projectForm: any) => void, onSubmit: () => void, savedFromDraft?: ProjectDraftType}){
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting, errors }
    } = useFormContext<CreateProjectForm>();

    const isFormDisabled = isSubmitting || watch("title") === "" || watch("description") === "";

    useEffect(() => {
        if(savedFromDraft){
            reset({
                title: savedFromDraft.title,
                description: savedFromDraft.description,
                liveDemoUrl: savedFromDraft.liveUrl,
                sourceCodeUrl: savedFromDraft.sourceUrl,
                issues: savedFromDraft.issues,
            });
        };
    }, [savedFromDraft, reset]);

    return(
        <form className="grid px-3 mt-3 w-full h-96 overflow-auto gap-2" onSubmit={handleSubmit(onSubmit)}>
            <Label className="text-primary text-sm" htmlFor="title">*Title</Label>
            <Input id="title" placeholder="Title*" {...register("title", {
                required: "Title is required",
                minLength: {
                    value: 4,
                    message: "Title must be long atleast 4 characters"
                },
                maxLength: {
                    value: 32,
                    message: "Title maximum can have 32 characters"
                }
            })} />

            {errors.title && <ErrorTooltip>{errors.title.message}</ErrorTooltip>}

            <Label className="text-primary text-sm" htmlFor="desc">*Description</Label>
            <Textarea className="h-20" placeholder="Description*" id="desc" {...register("description", {
                required: "Description is required",
                minLength: {
                    value: 18,
                    message: "Description must be long atleast 18 characters"
                },
                maxLength: {
                    value: 1000,
                    message: "Description maximum can have 1000 characters"
                }
            })} />

            {errors.description && <ErrorTooltip>{errors.description.message}</ErrorTooltip>}

            <Label className="text-primary text-sm" htmlFor="repo-url">*Repository URL</Label>
            <Input placeholder="Repository URL* (optional)" id="repo-url" {...register("sourceCodeUrl")} />

            <Label className="text-primary text-sm" htmlFor="live-url">*Live URL</Label>
            <Input placeholder="Live URL* (optional)" id="live-url" {...register("liveDemoUrl")} />

            <Label className="text-primary text-sm" htmlFor="issues">*Issues</Label>
            <Textarea placeholder="Issues* (optional)" id="issues" {...register("issues")} />

            <div className="flex md:justify-end justify-center gap-3 mb-5 w-full ">
                {!savedFromDraft && (
                    <Button className="md:w-32 w-1/2" type="button" onClick={saveDraft} variant={'secondary'} disabled={isFormDisabled || isSavingDraft}>{isSavingDraft ? <Loader2 className="animate-spin" /> : "Save Draft"}</Button>
                )}
                <Button className="md:w-32 w-1/2" disabled={isFormDisabled} type="submit">{isSubmitting ? <Loader2 className="animate-spin"/> : "Submit"}</Button>
            </div>
        </form>
    )
}