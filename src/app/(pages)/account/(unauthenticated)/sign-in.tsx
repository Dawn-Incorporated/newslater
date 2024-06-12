'use client'

import { useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { UserAuthForm } from "@/app/(pages)/account/(unauthenticated)/sign-in-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { libre_baskerville } from "@/lib/fonts";

export function SignIn() {
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.has('error')) {
            toast.error('Failed to sign in')
        }
    });

    return (
        <>
            <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900"/>
                    <div
                        className={cn(`relative z-20 flex items-center text-lg font-medium`, libre_baskerville.className)}>
                        newslater.
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2 flex flex-col">
                            <p className="text-3xl font-black">your news</p>
                            <p className="text-3xl font-normal">everyday</p>
                            <p className="text-3xl font-light">six a.m.</p>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Welcome
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to sign in or create an account.
                            </p>
                        </div>
                        <UserAuthForm/>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
