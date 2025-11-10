import router from "next/router";
import { useEffect } from "react";
import { loadFromSession, saveToSession } from "../lib/lib";
import { BiographyFormType, RegisterFormType, RegistrationSteps } from "@/types";

export function useSessionPersistence({
    status,
    step,
    stepView,
    avatarUrl,
    registerForm,
    biographyForm,
    setStep,
    setStepView,
    setAvatarUrl
}: {
    status: string,
    step: number,
    stepView: number,
    avatarUrl: string,
    registerForm: any,
    biographyForm: any,
    setStep: (savedStep: number) => void,
    setStepView: (savedView: number) => void,
    setAvatarUrl: (savedAvatar: string) => void
}){
    useEffect(() => {
        // load from session storage
        const savedStep = loadFromSession<RegistrationSteps>('step');
        const savedView = loadFromSession<RegistrationSteps>('stepView');
        const savedAvatar = loadFromSession<string>('avatarUrl');
        const savedRegister = loadFromSession<RegisterFormType>('registerForm');
        const savedBiography = loadFromSession<BiographyFormType>('biographyForm');
    
        // setting into state
        if (savedStep !== null) setStep(savedStep);
        if (savedView !== null) setStepView(savedView);
        if (savedAvatar) setAvatarUrl(savedAvatar);
        if (savedRegister) registerForm.reset(savedRegister);
        if (savedBiography) biographyForm.reset(savedBiography);
      }, []);
    
      useEffect(() => {
        // save to session storage
        saveToSession('step', step);
        saveToSession('stepView', stepView);
      }, [step, stepView]);
    
      useEffect(() => {
        const sub = registerForm.watch((values: RegisterFormType) => {
          saveToSession('registerForm', values);
        });
        return () => sub.unsubscribe();
      }, [registerForm]);
    
      useEffect(() => {
        const sub = biographyForm.watch((values: BiographyFormType) => {
          saveToSession('biographyForm', values);
        });
        return () => sub.unsubscribe();
      }, [biographyForm]);
    
      useEffect(() => {
        saveToSession('avatarUrl', avatarUrl);
      }, [avatarUrl]);
    
      useEffect(() => {
        if (status === 'authenticated') {
          router.push('/feed');
        }
      }, [status, router]);
}