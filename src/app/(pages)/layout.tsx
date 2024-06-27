import Navbar from "@/components/app/nav/navbar";
import { ReactNode } from "react";

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <>
            <Navbar/>
            { children }
        </>
    );
}
