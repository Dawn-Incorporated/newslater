import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/app/context/NextAuthProvider";
<<<<<<< HEAD
import Nav from "@/components/custom/general/Nav";
=======
import Header from "@/components/custom/Header";
>>>>>>> main
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
<<<<<<< HEAD
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
=======
    return (
        <html lang="en">
        <body className={ inter.className }>
        <NextAuthProvider>
            <Header />
            { children }
            <Toaster/>
        </NextAuthProvider>
        </body>
        </html>
    );
>>>>>>> main
}
