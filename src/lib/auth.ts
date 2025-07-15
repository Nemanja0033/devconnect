import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

export const logout = async () => {
  await signOut({ callbackUrl: "/" });
};

export const login = async (email: string, password: string) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res?.ok) {
    toast.success("Successfully logged in!");
  } else {
    toast.error(res?.error || "Login failed");
  }
};
