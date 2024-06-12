"use client"

import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { HTMLAttributes, useState } from "react";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

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

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
            </div>
            <div className="grid gap-2">
                <Button variant="outline" type="button" disabled={isLoading} onClick={async () => {
                    await signIn('github', {redirect: false})
                }}>
                    {isLoading ? (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin"/>
                    ) : (
                        <GitHubLogoIcon className="mr-2 h-4 w-4"/>
                    )}{" "}
                    GitHub
                </Button>

                <Button variant="outline" type="button" disabled={isLoading} onClick={async () => {
                    await signIn('google', {redirect: false})
                }}>
                    {isLoading ? (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin"/>
                    ) : (
                        <FaGoogle className="mr-2 h-4 w-4"/>
                    )}{" "}
                    Google
                </Button>
            </div>

        </div>
    )
}