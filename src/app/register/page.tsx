"use client";
import AvatarUploadForm from "@/components/forms/AvatarUploadForm";
import BiographyForm from "@/components/forms/BiographyForm";
import RegisterForm from "@/components/forms/RegisterForm";
import StepIndicator from "@/components/stepper/StepIndicator";
import { AVATAR_MAX_SIZE_MB, STEPS } from "@/constants/constants";
import { uploadToCloud } from "@/lib/uploadImage";
import { useUserStore } from "@/store/useUserStore";
import { AvatarForm, BiographyFormType, RegisterFormType, RegistrationSteps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage(){
    const { setUser } = useUserStore();
    const [step, setStep] = useState<RegistrationSteps>(0);
    const [stepView, setStepView] = useState<RegistrationSteps>(step)
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);

    const registerForm = useForm<RegisterFormType>({
        mode: "onChange"
    });
    const avatarForm = useForm<AvatarForm>({
        mode: "onChange"
    });
    const biographyForm = useForm<BiographyFormType>({
        mode: "onChange"
    });

    const credentialsData = registerForm.getValues();
    const biographyData = biographyForm.getValues();

    const router = useRouter();

    const setNextStep = () => {
        setStep((pervStep) => pervStep + 1);
        setStepView((pervStep) => pervStep + 1);
    };

    const registerUser = async () => {
        try{
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
            setUser({
                    username: credentialsData.username,
                    avatar: imgUrl,
                    email: credentialsData.email
            })
            setIsUploading(false);
        }
        catch(err){
            setIsUploading(false);
            toast.error("Error while uploading avatar");
            console.log(err);
        }
    }

    const updateUserBiography = async () => {
        try{
            const res = await fetch('api/user-bio', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentialsData.email,
                    avatar: avatarUrl,
                    title: biographyData.title,
                    bio: biographyData.bio
                })
            });

            if(!res.ok) toast.error("Error while updating user");

            if(res.ok){
                toast.success("User succesfully created"),
                setUser({
                    username: credentialsData.username,
                    email: credentialsData.email,
                    avatar: avatarUrl,
                });
                router.push('/');
            }
        }
        catch(err){
            toast.error("Error while updating user");
            console.log(err);
        }
    }

    return(
        <>
            <div className="mt-22 mb-10">
                {/* <h1 className="text-3xl font-bold text-center">DevConnect</h1>
                <p className="text-center text-muted-foreground">Share coding experiance and stories.</p> */}
                <StepIndicator viewStep={setStepView} steps={STEPS} step={step} />
            </div>
            <span>Step: {step + 1} Step In View: {stepView + 1}</span> Testing purpose
            <FormProvider {...registerForm}>
                {stepView === 0 && <RegisterForm onSubmit={registerUser} />}
            </FormProvider>

            <FormProvider  {...avatarForm}>
                {stepView === 1 && <AvatarUploadForm isUploading={isUploading} avatarPreviewUrl={avatarUrl} onSubmit={setNextStep} onUpload={handleAvatarUpload} />}
            </FormProvider>

            <FormProvider  {...biographyForm}>
                {stepView === 2 && <BiographyForm onSubmit={updateUserBiography} />}
            </FormProvider>
        </>
    )
}