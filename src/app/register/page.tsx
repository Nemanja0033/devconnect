"use client";
import AvatarUploadForm from "@/components/forms/AvatarUploadForm";
import RegisterForm from "@/components/forms/RegisterForm";
import StepIndicator from "@/components/stepper/StepIndicator";
import { STEPS } from "@/constants/constants";
import { AvatarForm, RegisterFormType, RegistrationSteps } from "@/types";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage(){
    const [step, setStep] = useState<RegistrationSteps>(1);

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
                toast.success("Success");
                setNextStep();
            }
        }
        catch(err){
            console.log(err)
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
                {step === 1 && <AvatarUploadForm onSubmit={handleCredentialsSubmit} />}
            </FormProvider>
        </>
    )
}