import { signIn, signOut } from "next-auth/react";

export const logout = async () => {
    await signOut({ callbackUrl: '/'});
}

export const login = async (email: string, password: string) => {
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