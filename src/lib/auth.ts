import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

export const logout = async () => {
    await signOut({ callbackUrl: '/'});
}

export const login = async (email: string, password: string) => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: '/'
    })
    .then(() => toast.success("Succesfully logedd!"))
    .catch((err) => toast.error(err))
};
