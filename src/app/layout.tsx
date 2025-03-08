"use client";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
            <html>
                <body>
                    {children}
                </body>
            </html>
           </SessionProvider>;
}
