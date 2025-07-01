import { AvatarForm } from "@/types";
import { useFormContext } from "react-hook-form";
import { Card } from "../ui/card";

export default function AvatarUploadForm({ onSubmit }: { onSubmit: () => void}){
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        reset,
        watch
    } = useFormContext<AvatarForm>();

    return(
        <Card className="p-6 w-full max-w-md">
            <form>
                
            </form>
        </Card>
    )
}