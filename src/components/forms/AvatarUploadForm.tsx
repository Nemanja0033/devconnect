import { AvatarForm, AvatarFormProps } from "@/types";
import { useFormContext } from "react-hook-form";
import { Card } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { ImageUp, Loader2 } from "lucide-react";
import ErrorTooltip from "../reusables/FormErrorTooltip";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";
import Avatar from "../user/Avatar";

export default function AvatarUploadForm({ onUpload, onSubmit, avatarPreviewUrl, isUploading }: AvatarFormProps){
    const { user } = useUserStore();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        reset,
        watch
    } = useFormContext<AvatarForm>();

    return(
        <Card className="p-6 h-[600px] w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full gird place-items-center">
                 <div className="grid h-52 place-items-center mb-3 gap-2 ">
                    <h2 className="text-xl font-semibold text-center">Hello {user?.username} upload your avatar</h2>
                    {isUploading ? <Loader2 className="animate-spin" /> : <Avatar size="lg" avatarUrl={avatarPreviewUrl} />}
                </div>

                <Label htmlFor="avatar-upload" className="mt-18 border-2 bg-accent text-gray-400 py-10 w-full grid place-items-center shadow-md rounded-md">
                    <ImageUp size={32} />
                    <span>Click here to upload your avatar</span>
                    <span>400x400 max 25MB</span>
                </Label>
                <Input {...register('avatarUrl', {
                    required: '*Avatar is required'
                })} type="file" accept="image/png, image/jpeg" onChange={onUpload} className="w-full relative opacity-0  bottom-40 h-39 cursor-pointer z-20" />
                
                <div className="relative w-full bottom-38">
                    {errors.avatarUrl && <ErrorTooltip>{errors.avatarUrl.message}</ErrorTooltip>}
                </div>

                <Button className="relative bottom-30 w-96" type="submit">Next</Button>
            </form>
        </Card>
    )
}