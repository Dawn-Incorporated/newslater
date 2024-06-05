import { SignIn } from "@/app/(auth)/signin/page";
import { AccountIncompleteForm } from "@/app/(pages)/account/account-incomplete";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Account() {
    const session = await auth()

    if (!session?.user) {
        return <SignIn/>
    }

    if (!session.user.name) {
        return <AccountIncompleteForm/>
    }

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
            <p className="text-center">
                Hello { session.user?.name }
            </p>
            <Button>
                Sign out
            </Button>
        </div>
    );
}