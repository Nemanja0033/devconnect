"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
            <html>
                <body>
                    <Navbar />
                    {children}
                </body>
            </html>
           </SessionProvider>;
}
