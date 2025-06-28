"use client";
import ErrorTooltip from "@/components/reusables/FormErrorTooltip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { STEPS } from "@/constants/constants";
import { RegisterFormType } from "@/types";
import { Label } from "@radix-ui/react-label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage(){
    const [step, setStep] = useState(1);

    const registerForm = useForm<RegisterFormType>({
        mode: "onSubmit"
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = registerForm;

    const password = watch("password");

    const setNextStep = () => {
        setStep((pervState) => pervState + 1);
    }

    return(
            <>
                <div className="mt-22">
                    <h1 className="text-3xl font-bold text-center">DevConnect</h1>
                    <p className="text-center text-muted-foreground">Share coding experiance and stories.</p>
                </div>

                <TooltipProvider>
                    <div className="flex justify-center items-center gap-5 mt-10">
                        {STEPS.map((s, i) => (
                            <div className="w-full flex items-center justify-center gap-5" key={i}>
                                <Tooltip>
                                <TooltipTrigger>
                                    <span className={`${step === (i + 1) ? 'bg-black' : 'bg-gray-300'} rounded-full h-10 w-10 text-white flex justify-center items-center text-lg font-bold"`}>{i + 1}</span>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-50 p-3">
                                    <p className="text-sm">{s.step}</p>
                                </TooltipContent>
                            </Tooltip>
                            {i !== 2 && <div className="h-1 w-5 bg-gray-400"></div>}
                            </div>
                        ))}
                    </div>
                </TooltipProvider>

                <Card className="w-full mt-10 max-w-md p-6">
                    <form onSubmit={handleSubmit(setNextStep)} className="grid place-items-start gap-3">
                        <h1 className="text-2xl">Register</h1>
                        <Label htmlFor="username">Username</Label>
                        <Input {...register("username", {
                            required: "*Username is required",
                            minLength: {
                                value: 3,
                                message: "*Username must have minimum 3 characters"
                            },
                            maxLength: {
                                value: 22,
                                message: "* Username can maximum have 22 characters"
                            }
                        })} id="username" placeholder="e.g Jhon Doe" />

                        {errors.username && <ErrorTooltip message={errors.username.message} />}

                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email", {
                            required: "*Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "*Invalid email"
                            }
                        })} id="email" type="email" placeholder="e.g example@email.com" />

                        {errors.email && <ErrorTooltip message={errors.email.message} />}

                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Passowrd must have minimum 6 character"
                            },
                            maxLength: {
                                value: 22,
                                message: "Password can have maximum 22 characters"
                            }
                        })} id="password" type="password" placeholder="********" />

                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input {...register("confirmPassword", {
                            required: "*Please confirm your password",
                            validate: (value) => value === password || "Passwords do not match"
                        })} id="confirmPassword" type="password" placeholder="********" />

                        {errors.confirmPassword && <ErrorTooltip message={errors.confirmPassword.message} /> }

                        <Button className="w-full mt-5 cursor-pointer" type="submit">Submit</Button>
                    </form>
                </Card>
            </>
    )
}