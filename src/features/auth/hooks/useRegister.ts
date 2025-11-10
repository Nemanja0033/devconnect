import { AVATAR_MAX_SIZE_MB } from "@/constants/constants";
import { uploadToCloud } from "@/lib/uploadImage";
import { RegisterFormType, BiographyFormType, RegistrationSteps } from "@/types";
import router from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export function useRegister(registerForm: any, biographyForm: any, setStep: any, setStepView: any){
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);

    const setNextStep = () => {
        setStep((prev: number) => prev + 1);
        setStepView((prev: number) => prev + 1);
    };

    const handleRegisterUser = registerForm.handleSubmit(async (data: RegisterFormType) => {
        try {
          const res = await fetch('api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
    
          if (!res.ok) {
            const errorData = await res.json();
            toast.error(errorData.error || 'Unknown error occurred');
            return;
          }
    
          toast.success('Success');
          setNextStep();
        } catch (err) {
          console.log(err);
          toast.error('Registration failed');
        }
    });
    
    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
          setIsUploading(true);
          const img = event.target.files?.[0];
          const imgSize = img?.size;
    
          if (!img || !imgSize) return;
          if (imgSize > AVATAR_MAX_SIZE_MB) throw new Error('Max avatar size is 25MB');
    
          const imgUrl: string = await uploadToCloud(img);
          setAvatarUrl(imgUrl);
    
          setIsUploading(false);
        } catch (err) {
          setIsUploading(false);
          toast.error('Error while uploading avatar');
          console.log(err);
        }
    };
    
    const handleUpdateUserBiography = biographyForm.handleSubmit(async (bioData: BiographyFormType) => {
        const { email } = registerForm.getValues();
    
        try {
          const res = await fetch('api/me', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              avatar: avatarUrl,
              title: bioData.title,
              bio: bioData.bio,
            }),
          });
    
          if (!res.ok) {
            toast.error('Error while updating user');
            return;
          }
    
          toast.success('User successfully created');
          sessionStorage.clear();
          router.push('/login');
        } catch (err) {
          toast.error('Error while updating user');
          console.log(err);
        }
    });

    return {
        avatarUrl,
        isUploading,
        handleRegisterUser,
        handleUpdateUserBiography,
        handleAvatarUpload,
        setNextStep,
        setAvatarUrl,
    }
}