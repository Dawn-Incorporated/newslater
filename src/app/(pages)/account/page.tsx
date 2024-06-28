import { AuthenticatedAccountPage } from "@/app/(pages)/account/(authenticated)/root";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Followed() {
    const session = await auth()

    if (!session?.user) {
        return notFound();
    }

    return (
        <AuthenticatedAccountPage/>
    )
}
