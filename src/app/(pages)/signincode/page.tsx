import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function Page() {
    return (
        <main className="flex flex-col items-center h-screen space-y-4 mx-3">
            <Card className="m-auto">
                <CardHeader>
                    <img src="https://i.ibb.co/c690ymG/newslater.png" alt="newslater" width={ 200 } height={ 200 }/>
                    <h1 className="text-2xl font-bold">Your Magic Link</h1>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <p>We are thrilled to welcome you. Click the button below to sign in to Newslater.</p>
                        <Link href={ "#" }><Button>Sign in to Newslater</Button></Link>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-xs text-muted-foreground items-start">
                    <p>This link will only be valid for the next 5 minutes. If the link does not work, please follow the below url: https://newslater.vercel.app/signin.</p>
                    <p>You did not request to sign in? You can ignore this email.</p>
                </CardFooter>
            </Card>
        </main>
    )
}