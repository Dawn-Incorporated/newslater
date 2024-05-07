import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/app/context/NextAuthProvider";
import Nav from "@/components/custom/general/Nav";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Newslater",
  description: "Send newsletters to your subscribers."
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
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
