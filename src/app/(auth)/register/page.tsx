'use client';
import StepIndicator from '@/components/stepper/StepIndicator';
import { STEPS } from '@/constants/constants';
import AvatarUploadForm from '@/features/auth/components/forms/AvatarUploadForm';
import BiographyForm from '@/features/auth/components/forms/BiographyForm';
import RegisterForm from '@/features/auth/components/forms/RegisterForm';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { useSessionPersistence } from '@/features/auth/hooks/useSessionPersistence';
import { AvatarForm, BiographyFormType, RegisterFormType, RegistrationSteps } from '@/types';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function RegisterPage() {
  const { status } = useSession();
  const [step, setStep] = useState<RegistrationSteps>(Number(sessionStorage.getItem("step")));
  const [stepView, setStepView] = useState<RegistrationSteps>(Number(sessionStorage.getItem("stepView")));
  const registerForm = useForm<RegisterFormType>({ mode: 'onChange' });
  const avatarForm = useForm<AvatarForm>({ mode: 'onChange' });
  const biographyForm = useForm<BiographyFormType>({ mode: 'onChange' });

  const { 
      avatarUrl,
      isUploading,
      handleRegisterUser,
      handleUpdateUserBiography,
      setNextStep,
      handleAvatarUpload,
      setAvatarUrl,
  } = useRegister(registerForm, biographyForm, setStep, setStepView);

  useSessionPersistence(
    {
      status,
      step,
      stepView,
      avatarUrl,
      registerForm,
      biographyForm,
      setAvatarUrl,
      setStep,
      setStepView
    }
  )

  return (
    <>
      <div className="mt-22 mb-10">
        <StepIndicator viewStep={setStepView} steps={STEPS} step={step} />
      </div>
      {stepView === 0 && (
        <div className="w-full flex justify-center">
          <FormProvider {...registerForm}>
            <RegisterForm step={step} onSubmit={handleRegisterUser} />
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
            <BiographyForm avatar={avatarUrl} onSubmit={handleUpdateUserBiography} />
          </FormProvider>
        </div>
      )}
    </>
  );
}