"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth";
import { LoginFormType } from "@/types";
import { Label } from "@radix-ui/react-label";
import email from "next-auth/providers/email";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const loginForm = useForm<LoginFormType>({
    mode: 'onSubmit'
  });

  const {
    handleSubmit,
    formState: {errors, isSubmitting},
    register,
  } = loginForm;

  const { email, password } = loginForm.getValues();    

  const handleLogin = async () => {
    const response = await fetch('/api/login', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    if (response.ok) {
      await signIn("credentials", { email, password, callbackUrl: '/'});
    } 
};

return(
  <main className="w-full h-screen grid place-items-center">
    <Card className="w-full max-w-md p-6">
      <form onSubmit={handleSubmit(() => login(email, password))} className="grid place-items-start gap-5">
        <div>
          <h1 className="text-2xl">Login</h1>
        </div>
        
        <div className="w-full grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input {...register("email", {
            required: "Please enter your email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })} id="email" type="email" placeholder="e.g jhondoe@example.com" />
        </div>

        <div className="w-full grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password", {required: "Please enter your password"})} id="email" type="password" placeholder="*****" />
        </div>

        <Button className="w-full cursor-pointer">Submit</Button>
      </form>
    </Card>
  </main>
)

}

export default LoginPage