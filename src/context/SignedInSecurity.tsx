import { ReactNode } from 'react';
import { auth } from "@/auth";
import { SignIn } from "@/app/(pages)/account/(unauthenticated)/sign-in";
import { AccountIncompleteForm } from "@/app/(pages)/account/(unauthenticated)/account-incomplete";

interface SignedInSecurityProps {
    children: ReactNode;
}

export default async function SignedInSecurity({children}: SignedInSecurityProps) {
    const session = await auth()

    const user = session?.user

    if (!user) {
        return <SignIn/>
    }

    const isAccountComplete = user?.name

    if (!isAccountComplete) {
        return <AccountIncompleteForm />
    }

    return (
        <>
            {children}
        </>
    );
}
