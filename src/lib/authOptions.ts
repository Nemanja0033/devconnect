import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prismaClient";
import { compare } from "bcrypt";
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
          if (!credentials?.email || !credentials?.password) {
            throw new Error("All fields are required");
          }

          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !(await compare(credentials.password, user.password))) {
            throw new Error("Invalid credentials");
          }

          return { id: user.id, name: user.username, email: user.email };
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
