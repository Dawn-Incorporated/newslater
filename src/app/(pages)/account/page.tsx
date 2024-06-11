import SettingsLayout from "@/app/(pages)/account/(authenticated)/layout";
import { AuthenticatedAccountPage } from "@/app/(pages)/account/(authenticated)/root";
import { AccountIncompleteForm } from "@/app/(pages)/account/(unauthenticated)/account-incomplete";
import { SignIn } from "@/app/(pages)/account/(unauthenticated)/sign-in";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function Followed() {
    return (
        <SettingsLayout>
            <Suspense fallback={<p>Loading</p>}>
                <MainElement/>
            </Suspense>
        </SettingsLayout>
    )
}

async function MainElement() {
    const session = await auth()

    if (!session?.user) {
        return <SignIn/>
    }

    if (!session.user.name) {
        return <AccountIncompleteForm/>
    }

    return <AuthenticatedAccountPage email={session.user.email}/>
}