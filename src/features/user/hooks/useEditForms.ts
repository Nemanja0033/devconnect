import { useForm } from "react-hook-form";

export function useEditForms(){
    const editHeadingForm = useForm<any>({ mode: 'onSubmit' });
    const editAboutForm = useForm<any>({ mode: "onSubmit" });

    return{
        editAboutForm,
        editHeadingForm
    }
}