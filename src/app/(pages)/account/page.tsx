import SettingsLayout from "@/app/(pages)/account/(authenticated)/layout";
import { AuthenticatedAccountPage } from "@/app/(pages)/account/(authenticated)/root";
import { AccountIncompleteForm } from "@/app/(pages)/account/(unauthenticated)/account-incomplete";
import { SignIn } from "@/app/(pages)/account/(unauthenticated)/sign-in";
import { auth } from "@/auth";

export default async function Followed() {
    const session = await auth()

    if (!session?.user) {
        return <SignIn/>
    }

    if (!session.user.name) {
        return <AccountIncompleteForm/>
    }

    return (
        <SettingsLayout>
            <AuthenticatedAccountPage email={ session.user.email }/>
        </SettingsLayout>
    )
}
