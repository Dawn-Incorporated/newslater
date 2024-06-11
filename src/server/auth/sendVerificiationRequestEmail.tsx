import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { send } from "@/server/config/mailer";
import { Body, Button, Head, Html, Tailwind, Text } from "@react-email/components";
import React from "react";

export default async function emailForMagicLink(identifier: string, url: string) {
    void send(identifier, "Welcome to newslater.", ReactMail(identifier, url));
}

const ReactMail = (identifier: string, url: string) => {
    return (
        <Html>
            <Head/>
            <Tailwind>
                <Body className="flex flex-col items-center h-screen mx-3">
                    <Card>
                        <CardContent>
                            <div className="flex flex-col">
                                <img src="https://i.ibb.co/c690ymG/newslater.png" alt="newslater" style={ {width: '200px'} }/>
                                <h1 className="text-2xl font-bold">Your Magic Link</h1>
                                <p>We are thrilled to welcome you. Click the button below to sign in to newslater.</p>
                                <Button
                                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                    href={ url }
                                >
                                    Sign in to newslater.
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 text-xs text-muted-foreground items-start">
                            <Text className="text-[#666666] text-[12px] leading-[24px]">
                                This invitation was intended for{ " " }
                                <span className="text-black">{ identifier }</span>
                                . If you
                                were not expecting this invitation, you can ignore this email.
                                This link will only be valid for the next 5 minutes.
                                If the link does not work, please follow the below url: https://newslater.vercel.app/signin.
                            </Text>
                        </CardFooter>
                    </Card>
                </Body>
            </Tailwind>
        </Html>
    )
}