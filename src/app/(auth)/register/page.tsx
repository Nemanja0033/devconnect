'use client';
import StepIndicator from '@/components/stepper/StepIndicator';
import { AVATAR_MAX_SIZE_MB, STEPS } from '@/constants/constants';
import AvatarUploadForm from '@/features/auth/components/forms/AvatarUploadForm';
import BiographyForm from '@/features/auth/components/forms/BiographyForm';
import RegisterForm from '@/features/auth/components/forms/RegisterForm';
import { uploadToCloud } from '@/lib/uploadImage';
import { useUserStore } from '@/store/useUserStore';
import { AvatarForm, BiographyFormType, RegisterFormType, RegistrationSteps } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

function saveToSession(key: string, value: any) {
  if (value === undefined) return;
  sessionStorage.setItem(key, JSON.stringify(value));
}

function loadFromSession<T>(key: string): T | null {
  const item = sessionStorage.getItem(key);
  if (!item || item === 'undefined') return null;
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
}

export default function RegisterPage() {
  const { setUser } = useUserStore();
  const [step, setStep] = useState<RegistrationSteps>(0);
  const [stepView, setStepView] = useState<RegistrationSteps>(0);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const registerForm = useForm<RegisterFormType>({ mode: 'onChange' });
  const avatarForm = useForm<AvatarForm>({ mode: 'onChange' });
  const biographyForm = useForm<BiographyFormType>({ mode: 'onChange' });

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    const savedStep = loadFromSession<RegistrationSteps>('step');
    const savedView = loadFromSession<RegistrationSteps>('stepView');
    const savedAvatar = loadFromSession<string>('avatarUrl');
    const savedRegister = loadFromSession<RegisterFormType>('registerForm');
    const savedBiography = loadFromSession<BiographyFormType>('biographyForm');

    if (savedStep !== null) setStep(savedStep);
    if (savedView !== null) setStepView(savedView);
    if (savedAvatar) setAvatarUrl(savedAvatar);
    if (savedRegister) registerForm.reset(savedRegister);
    if (savedBiography) biographyForm.reset(savedBiography);
  }, []);

  useEffect(() => {
    saveToSession('step', step);
    saveToSession('stepView', stepView);
  }, [step, stepView]);

  useEffect(() => {
    const sub = registerForm.watch((values) => {
      saveToSession('registerForm', values);
    });
    return () => sub.unsubscribe();
  }, [registerForm]);

  useEffect(() => {
    const sub = biographyForm.watch((values) => {
      saveToSession('biographyForm', values);
    });
    return () => sub.unsubscribe();
  }, [biographyForm]);

  useEffect(() => {
    saveToSession('avatarUrl', avatarUrl);
  }, [avatarUrl]);

  const setNextStep = () => {
    setStep((prev) => prev + 1);
    setStepView((prev) => prev + 1);
  };

  const registerUser = registerForm.handleSubmit(async (data) => {
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

      setUser({ username: data.username, avatar: '', email: data.email });
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

      const { username, email } = registerForm.getValues();
      setUser({ username, avatar: imgUrl, email });
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      toast.error('Error while uploading avatar');
      console.log(err);
    }
  };

  const updateUserBiography = biographyForm.handleSubmit(async (bioData) => {
    const { username, email } = registerForm.getValues();

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
      setUser({ username, email, avatar: avatarUrl });
      sessionStorage.clear();
      router.push('/login');
    } catch (err) {
      toast.error('Error while updating user');
      console.log(err);
    }
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/feed');
    }
  }, [status, router]);

  return (
    <>
      <div className="mt-22 mb-10">
        <StepIndicator viewStep={setStepView} steps={STEPS} step={step} />
      </div>
      {stepView === 0 && (
        <div className="w-full flex justify-center">
          <FormProvider {...registerForm}>
            <RegisterForm onSubmit={registerUser} />
          </FormProvider>
        </div>
      )}
      {stepView === 1 && (
        <div className="w-full flex justify-center">
          <FormProvider {...avatarForm}>
            <AvatarUploadForm
              isUploading={isUploading}
              avatarPreviewUrl={avatarUrl}
              onSubmit={setNextStep}
              onUpload={handleAvatarUpload}
            />
          </FormProvider>
        </div>
      )}
      {stepView === 2 && (
        <div className="w-full flex justify-center">
          <FormProvider {...biographyForm}>
            <BiographyForm onSubmit={updateUserBiography} />
          </FormProvider>
        </div>
      )}
    </>
  );
}