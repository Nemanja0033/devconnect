"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth";
import { LoginFormType } from "@/types";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    mode: "onSubmit",
  });

  const router = useRouter();

  const handleLogin = async (data: LoginFormType) => {
    const { email, password } = data;
    await login(email, password);
  };

  return (
    <main className="w-full h-screen grid place-items-center">
      <Card className="w-full max-w-md p-6">
        <form onSubmit={handleSubmit(handleLogin)} className="grid place-items-start gap-5">
          <div>
            <h1 className="text-2xl">Login</h1>
          </div>

          <div className="w-full grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", {
                required: "Please enter your email address",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="w-full grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", { required: "Please enter your password" })}
              id="password"
              name="password"
              type="password"
              placeholder="*****"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <Button className="w-full cursor-pointer" disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default LoginPage;
