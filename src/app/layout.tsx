"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700']
})

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
            <html>
                <body className={roboto.className}>
                    {children}
                </body>
            </html>
           </SessionProvider>;
}
