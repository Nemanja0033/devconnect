"use client";
import ErrorTooltip from "@/components/reusables/FormErrorTooltip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth";
import { fetchCurrentUser } from "@/features/user/services/userService";
import { LoginFormType } from "@/types";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
  const { status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: fetchCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    }
  });

  const handleLogin = async (data: LoginFormType) => {
    const { email, password } = data;
    await login(email, password);
    // trigerr re-fetch to grab right data for current logged user.
    await mutateAsync();
  };

  if(status === "authenticated") {
    router.push('/feed');
  }

  return (
    <main className="w-full h-[70vh] flex items-center justify-center place-items-center">
      <Card className="w-full max-w-sm h-fit p-5">
        <form onSubmit={handleSubmit(handleLogin)} className="grid place-items-start gap-6">
          <div>
            <h1 className="text-xl">Login</h1>
          </div>

          <div className="w-full grid gap-1">
            <Label htmlFor="email" className="text-sm text-primary">*Email</Label>
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
            {errors.email && <ErrorTooltip>{errors.email?.message}</ErrorTooltip>}
          </div>

          <div className="w-full grid gap-1">
          <Label htmlFor="email" className="text-sm text-primary">*Password</Label>
          <Input
              {...register("password", { required: "Please enter your password" })}
              id="password"
              name="password"
              type="password"
              placeholder="*****"
            />
            {errors.password && <ErrorTooltip>{errors.password?.message}</ErrorTooltip>}
          </div>

          <div className="w-full flex justify-between">
            <Link href={'/register'} className="text-xs text-gray-300 hover:text-primary hover:underline cursor-pointer">Dont have account?</Link>
            <Button className="cursor-pointer" disabled={isSubmitting} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
};

export default LoginPage;
