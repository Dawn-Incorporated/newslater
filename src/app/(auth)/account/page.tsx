'use client'

import { SignIn } from "@/app/(auth)/account/SignIn";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Account() {
    const {data: session, status} = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.has("error")) {
            toast.error(searchParams.get("error"))
            void router.push("/account")
        }
    }, [router, searchParams]);

    if (status === 'authenticated') {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
                <p className="text-center">
                    Hello { session.user?.name || "N/A" }
                </p>

                <Button onClick={ () => signOut() }>
                    Sign out
                </Button>
            </div>
        )
    } else {
        return <SignIn/>
    }
}