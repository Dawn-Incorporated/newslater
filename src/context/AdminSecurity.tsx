import { ReactNode } from 'react';
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { SignIn } from "@/app/(pages)/account/(unauthenticated)/sign-in";

interface AdminSecurityProps {
    children: ReactNode;
    showBlank?: boolean;
}

export default async function AdminSecurity({children, showBlank}: AdminSecurityProps) {
    const session = await auth()

    const user = session?.user

    if (!user) {
        return <SignIn/>
    }

    const hasClearance = user?.settings.isAdmin

    if (!hasClearance) {
        if (showBlank) {
            return null
        }
        return notFound()
    }

    return (
        <>
            {children}
        </>
    );
}
