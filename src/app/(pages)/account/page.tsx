import { AuthenticatedAccountPage } from "@/app/(pages)/account/(authenticated)/root";
import SignedInSecurity from "@/context/SignedInSecurity";

export default function Followed() {

    return (
        <SignedInSecurity>
            <AuthenticatedAccountPage/>
        </SignedInSecurity>
    )
}
