import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

export function SignIn() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Sign in to your account using a third-party provider.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full gap-2"
                        onClick={() => {
                            signIn('github')
                        }}
                    ><GitHubLogoIcon/>Sign in with GitHub</Button>
                </CardFooter>
            </Card>
        </div>

    )
}
