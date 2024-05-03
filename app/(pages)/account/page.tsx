'use client'

import { signOut, useSession } from "next-auth/react";
import { SignIn } from "@/app/(pages)/account/SignIn";
import { Button } from "@/components/ui/button";

export default function Account() {
    const {data: session, status, update} = useSession()

    if (status === 'authenticated') {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
                <p className="text-center">
                    Hello { session.user.name }
                </p>

                <Button onClick={() => signOut()}>
                    Sign out
                </Button>
            </div>
        )
    } else {
        return <SignIn/>
    }
}