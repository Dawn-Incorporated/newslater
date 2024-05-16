'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { _onSubmit } from "@/app/(auth)/account/magicLink"
import { useState } from "react";

export function SignIn() {
    const [email, setEmail] = useState<string>("")


    return (
        <div className="flex w-full h-[100svh] lg:grid lg:grid-cols-2">
            <div className="flex flex-col m-auto w-1/2 h-fit justify-center">
                <h1 className="text-2xl text-center font-medium mb-4">
                    newslater.
                </h1>
                <Card>
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
                <h3 className="text-xl text-center text-muted-foreground font-medium mt-4 mb-4">
                    or
                </h3>
                <Card className={"border-none shadow-none"}>
                    <CardHeader>
                        <CardTitle className={"m-auto text-muted-foreground"} >Sign in without password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"/>
                    </CardContent>
                    <CardFooter>
                        <Button className="gap-2 m-auto bg-muted-foreground"
                                onClick={() => {
                                    _onSubmit(email)
                                }}
                        ><Mail size={"18"} />Send link</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="hidden bg-muted lg:flex flex-col justify-center items-center h-full w-full">
            <span className="bg-gradient-to-t from-red-500 via-yellow-500 to-blue-500 absolute w-1/2 h-full opacity-10"></span>
                <p className="text-3xl font-black">your news</p>
                <p className="text-3xl font-normal">everyday</p>
                <p className="text-3xl font-light">six a.m.</p>
            </div>
        </div>

    )
}
