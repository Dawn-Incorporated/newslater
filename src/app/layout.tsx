import NextAuthProvider from "@/app/context/NextAuthProvider";
import { inter } from "@/components/fonts";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Newslater",
    description: "Send newsletters to your subscribers."
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={ inter.className }>
        <NextAuthProvider>
            { children }
            <Toaster/>
        </NextAuthProvider>
        <Toaster richColors={ true }/>
        </body>
        </html>
    );
}
