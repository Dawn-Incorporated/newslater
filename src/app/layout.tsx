import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import NextAuthProvider from "@/app/context/NextAuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

const inter = Inter({subsets: ["latin"]});

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
        </body>
        </html>
    );
}
