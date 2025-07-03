import { useUserStore } from "@/store/useUserStore";
import { BiographyFormType } from "@/types";
import { useFormContext } from "react-hook-form";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { use, useState } from "react";
import { Input } from "../ui/input";
import ErrorTooltip from "../reusables/FormErrorTooltip";
import { Label } from "@radix-ui/react-label";
import Avatar from "../user/Avatar";

export default function BiographyForm({ onSubmit }: { onSubmit: () => void}){
    const BIO_MAX_LENGTH = 100;
    const [currentBioLenght, setCurrentBioLenght] = useState(0);
    const { user } = useUserStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        reset,
        watch
    } = useFormContext<BiographyFormType>();

    return(
        <Card className="p-6 grid gap-3 place-items-center w-full max-w-md"> 
            <div>
                <h1 className="text-2xl font-semibold text-center">Finish your profile</h1>
            </div>

            <div>
                <Avatar avatarUrl={user?.avatar ?? ""} size="lg" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input {...register('title', {
                    required: "Title is required",
                    maxLength: {
                        value: 40,
                        message: "Title can have maximum 40 characters"
                    }
                })} id="title" placeholder="Title. . ."  />

                {errors.title && <ErrorTooltip>{errors.title.message}</ErrorTooltip>}

                <Label htmlFor="bio">Biography</Label>
                <Textarea {...register('bio', {
                    required: "Biography is required",
                    minLength: {
                        value: 20,
                        message: "Biography must have at least 20 characters"
                    },
                    maxLength: {
                        value: 100,
                        message: "Biography can have maxium 100 characters"
                    }
                })} id="bio" className="p-3 h-32" onChange={(e) => setCurrentBioLenght(e.target.value.length)} placeholder="About me . . ." />

                {errors.bio && <ErrorTooltip>{errors.bio.message}</ErrorTooltip>}

                <div className="w-full text-sm">
                    <span>{currentBioLenght}/{BIO_MAX_LENGTH}</span>
                </div>

                <Button disabled={isSubmitting} className="w-full">{isSubmitting ? "Submiting. . ." : 'Submit'}</Button>
            </form>
        </Card>
    )
}