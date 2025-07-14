import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

export const logout = async () => {
    await signOut({ callbackUrl: '/'});
}

export const login = async (email: string, password: string) => {
  const res = await signIn("credentials", {
    callbackUrl: "/", // sprečava automatski redirect, pa ti možeš da kontrolišeš ponašanje
    email,
    password,
  });

  if (res?.ok) {
    toast.success("Successfully logged in!");
    // Preusmeri ručno ako želiš:
  } else {
    toast.error(res?.error || "Login failed");
  }
};

