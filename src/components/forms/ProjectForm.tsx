import { CreateProjectForm, ProjectDraftType } from "@/types";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import ErrorTooltip from "../reusables/FormErrorTooltip";
import { useEffect } from "react";

export default function ProjectForm({ onSubmit, saveDraft, isSavingDraft, savedFromDraft }: { isSavingDraft?: boolean, saveDraft?: () => void, onSubmit: () => void, savedFromDraft?: ProjectDraftType}){
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
        <form className="grid mt-3 w-full gap-5" onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Title*" {...register("title", {
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

            <Textarea className="h-20" placeholder="Description*" {...register("description", {
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


            <Input placeholder="Repository URL* (optional)" {...register("sourceCodeUrl")} />

            <Input placeholder="Live URL* (optional)" {...register("liveDemoUrl")} />

            <Textarea placeholder="Issues* (optional)" {...register("issues")} />

            <div className="flex md:justify-end justify-center gap-3 w-full ">
                {savedFromDraft === null ? (
                    <Button className="md:w-32 w-1/2" type="button" onClick={saveDraft} variant={'secondary'} disabled={isFormDisabled || isSavingDraft}>{isSavingDraft ? <Loader2 className="animate-spin" /> : "Save Draft"}</Button>
                ) : null}
                <Button className="md:w-32 w-1/2" disabled={isFormDisabled} type="submit">{isSubmitting ? <Loader2 className="animate-spin"/> : "Submit"}</Button>
            </div>
        </form>
    )
}