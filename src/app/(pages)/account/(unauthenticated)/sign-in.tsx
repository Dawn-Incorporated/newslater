'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

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
                    <CardFooter className="flex flex-col gap-2">
                        <Button className="w-full gap-2"
                                onClick={ async () => {
                                    await signIn('github', {redirect: false})
                                } }
                        ><GitHubLogoIcon/>Sign in with Github</Button>
                        <Button variant="outline" className="w-full gap-2"
                                onClick={ async () => {
                                    await signIn('google', {redirect: false})
                                        .catch((e) => {
                                            console.error(e)
                                        });
                                } }
                        ><FaGoogle/>Sign in with Google</Button>
                    </CardFooter>
                </Card>
                <h3 className="text-xl text-center text-muted-foreground font-medium mt-4 mb-4">
                    or
                </h3>
                <Card className={ "border-none shadow-none" }>
                    <CardHeader>
                        <CardTitle className={ "m-auto text-muted-foreground" }>Sign in without password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input value={ email } onChange={ (e) => setEmail(e.target.value) } type="email" placeholder="Email"/>
                    </CardContent>
                    <CardFooter>
                        <Button className="gap-2 m-auto bg-muted-foreground"
                                onClick={ () => {
                                    toast.promise(new Promise(async (resolve, reject) => {
                                        try {
                                            const schemaMagicLink = z.string().email().min(1).max(255)
                                            const valid = schemaMagicLink.safeParse(email)

                                            if (!valid.success) {
                                                reject(new Error('Invalid email'))
                                            }

                                            resolve(await signIn('resend', {email: email, redirect: false}))
                                        } catch (error) {
                                            reject(error)
                                        }
                                    }), {
                                        loading: 'Sending magic link...',
                                        success: 'Magic link sent!',
                                        error: (e) => e.message || 'Failed to send magic link'
                                    })
                                } }
                        >
                            <Mail size={ 18 }/>Send link
                        </Button>
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
