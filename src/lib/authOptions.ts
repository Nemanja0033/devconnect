import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prismaClient";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export function getAuthOptions(): NextAuthOptions {
  return {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "example@mail.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.email || !credentials?.password) {
              console.warn("Missing credentials");
              return null;
            }

            const user = await db.user.findUnique({
              where: { email: credentials.email },
            });

            const isValidPassword = user && (await compare(credentials.password, user.password));

            if (!isValidPassword) {
              console.warn("Invalid login attempt for:", credentials.email);
              return null;
            }

            return { id: user.id, name: user.username, email: user.email };
          } catch (err) {
            console.error("Authorization error:", err);
            return null;
          }
        },
      }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/login" },
    callbacks: {
      async jwt({ token, user }: any) {
        if (user) token.id = user.id;
        return token;
      },
      async session({ session, token }: any) {
        if (session.user) session.user.id = token.id;
        return session;
      },
    },
  };
}
