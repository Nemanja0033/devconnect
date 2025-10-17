import { EditAboutForm, EditHeadingForm } from "@/app/(dashboard)/profile/[username]/page";
import { useForm } from "react-hook-form";

export function useEditForms(){
    const editHeadingForm = useForm<EditHeadingForm>({ mode: 'onSubmit' });
    const editAboutForm = useForm<EditAboutForm>({ mode: "onSubmit" });

    return{
        editAboutForm,
        editHeadingForm
    }
}