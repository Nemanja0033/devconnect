import { AvatarForm, AvatarFormProps } from "@/types";
import { useFormContext } from "react-hook-form";
import { Card } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { ImageUp, Loader2 } from "lucide-react";
import ErrorTooltip from "../reusables/FormErrorTooltip";
import { Button } from "../ui/button";
import { useState } from "react";

export default function AvatarUploadForm({ onUpload, avatarPreviewUrl, isUploading }: AvatarFormProps){

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        reset,
        watch
    } = useFormContext<AvatarForm>();

    return(
        <Card className="p-6 h-[600px] w-full max-w-md">
            <form className="w-full gird place-items-center">
                 <div className="grid h-52 place-items-center mb-3 gap-2 ">
                    <h2 className="text-2xl font-semibold">Avatar preview</h2>
                    {isUploading ? <Loader2 className="animate-spin" /> : <img className="rounded-full h-52 border-12 border-grey-200" src={avatarPreviewUrl !== '' ? avatarPreviewUrl : '/avatar-placeholder.png'} alt="" />}
                </div>

                <h1 className="text-2xl font-semibold mt-13 mb-3">Choose Your Avatar</h1>
                <Label htmlFor="avatar-upload" className="relative border-2 bg-gray-50 text-gray-400 py-10 w-full grid place-items-center shadow-md rounded-md">
                    <ImageUp size={32} />
                    <span>Click here to upload your avatar</span>
                    <span>400x400 max 25MB</span>
                </Label>
                <Input {...register('avatarUrl', {
                    required: '*Avatar is required'
                })} type="file" accept="image/png, image/jpeg" onChange={onUpload} className="w-full relative opacity-0  bottom-40 h-39 cursor-pointer z-20" />
                
                {errors.avatarUrl && <ErrorTooltip>{errors.avatarUrl.message}</ErrorTooltip>}

                <Button className="relative bottom-32 w-full" type="submit">Submit</Button>
            </form>
        </Card>
    )
}