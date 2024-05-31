'use client'

import { SignIn } from "@/app/(auth)/account/SignIn";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import { updateUser } from "@/server/db/action/usersActions";

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nameValue = (event.currentTarget.elements.namedItem('name') as HTMLInputElement)?.value;

        if (session?.user?.email && typeof nameValue === 'string') {
            await updateUser(session.user.email, nameValue);
            window.location.reload()
        }
    };

    if (status === 'authenticated') {
        if (!session?.user?.name) {
            return (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
                    <p className="text-center">
                        You are signed in, but your account is not complete. Please complete your account.
                    </p>
                    <form className={ "flex gap-4 mt-5 " } onSubmit={ handleSubmit }>
                        <Input type="text" placeholder={ "Name" } name="name"/>
                        <Button type="submit">
                            Save
                        </Button>
                    </form>
                </div>
            )
        }
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
                <p className="text-center">
                    Hello { session.user?.name }
                </p>
                <Button onClick={ () => signOut() }>
                    Sign out
                </Button>
            </div>
        )
    }
    return <SignIn/>
}