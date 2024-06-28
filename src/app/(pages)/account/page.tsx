import { AuthenticatedAccountPage } from "@/app/(pages)/account/(authenticated)/root";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { SignIn } from "@/app/(pages)/account/(unauthenticated)/sign-in";

export default async function Followed() {
    const session = await auth()

    if (!session?.user) {
        return <SignIn />
    }

    return (
        <AuthenticatedAccountPage/>
    )
}
