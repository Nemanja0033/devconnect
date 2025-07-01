"use client";
import AvatarUploadForm from "@/components/forms/AvatarUploadForm";
import RegisterForm from "@/components/forms/RegisterForm";
import StepIndicator from "@/components/stepper/StepIndicator";
import { AVATAR_MAX_SIZE_MB, STEPS } from "@/constants/constants";
import { uploadToCloud } from "@/lib/uploadImage";
import { useUserStore } from "@/store/useUserStore";
import { AvatarForm, RegisterFormType, RegistrationSteps } from "@/types";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage(){
    const { setUser } = useUserStore();
    const [step, setStep] = useState<RegistrationSteps>(2);
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);

    const registerForm = useForm<RegisterFormType>({
        mode: "onChange"
    });
    
    const avatarForm = useForm<AvatarForm>({
        mode: "onChange"
    });

    const setNextStep = () => {
        setStep((pervStep) => pervStep + 1);
    };

    const handleCredentialsSubmit = async () => {
        try{
            const credentialsData = registerForm.getValues();
            const res = await fetch('api/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: credentialsData.username,
                    email: credentialsData.email,
                    password: credentialsData.password
                })
            });

            if(!res.ok){
                toast.error('Error');
            }

            if(res.ok){
                setUser({
                    username: credentialsData.username,
                    avatar: null,
                    email: credentialsData.email
                })
                toast.success("Success");
                setNextStep();
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try{
            setIsUploading(true);
            const img = event.target.files?.[0];
            const imgSize = img?.size
            
            if(!img || !imgSize) return;

            if(imgSize > AVATAR_MAX_SIZE_MB){
                throw new Error('Max avatar size is 25MB');
            };

            const imgUrl: string = await uploadToCloud(img);
            setAvatarUrl(imgUrl);
            setIsUploading(false);
        }
        catch(err){
            setIsUploading(false);
            toast.error("Error while uploading avatar");
            console.log(err);
        }
    }

    return(
        <>
            <div className="mt-22 mb-10">
                <h1 className="text-3xl font-bold text-center">DevConnect</h1>
                <p className="text-center text-muted-foreground">Share coding experiance and stories.</p>
                <StepIndicator steps={STEPS} step={step} />
            </div>
            <FormProvider {...registerForm}>
                {step === 0 && <RegisterForm onSubmit={handleCredentialsSubmit} />}
            </FormProvider>

            <FormProvider  {...avatarForm}>
                {step === 1 && <AvatarUploadForm isUploading={isUploading} avatarPreviewUrl={avatarUrl} onSubmit={setNextStep} onUpload={handleAvatarUpload} />}
            </FormProvider>
        </>
    )
}