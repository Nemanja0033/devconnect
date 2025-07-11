import { Label } from "@radix-ui/react-label";
import ErrorTooltip from "../reusables/FormErrorTooltip";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { RegisterFormType } from "@/types";
import Link from "next/link";

export default function RegisterForm({ onSubmit }: { onSubmit: () => void}){
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        watch
    } = useFormContext<RegisterFormType>();

    const password = watch("password");

    return(
        <Card className="w-full max-w-md p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid place-items-start gap-3">
                        <h1 className="text-2xl font-semibold">Register</h1>
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

                        {errors.username && <ErrorTooltip>{errors.username.message}</ErrorTooltip>}

                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email", {
                            required: "*Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "*Invalid email"
                            }
                        })} id="email" type="email" placeholder="e.g example@email.com" />

                        {errors.email && <ErrorTooltip>{errors.email.message}</ErrorTooltip>}

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

                        {errors.password && <ErrorTooltip>{errors.password.message}</ErrorTooltip>}

                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input {...register("confirmPassword", {
                            required: "*Please confirm your password",
                            validate: (value) => value === password || "Passwords do not match"
                        })} id="confirmPassword" type="password" placeholder="********" />

                        {errors.confirmPassword && <ErrorTooltip>{errors.confirmPassword.message}</ErrorTooltip> }

                        <Link className="text-xs hover:underline" href={'/login'}>Arleady have account?</Link>

                        <Button disabled={isSubmitting} className="w-full mt-5 cursor-pointer" type="submit">{isSubmitting ? "Submited. . ." : "Submit"}</Button>
                    </form>
                </Card>
    )
}