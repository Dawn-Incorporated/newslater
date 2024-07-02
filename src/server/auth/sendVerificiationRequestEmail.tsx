import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { send } from "@/server/config/mailer";
import {
  Body,
  Button,
  Head,
  Html, Img,
  Tailwind,
  Text
} from "@react-email/components";
import React from "react";

export default async function emailForMagicLink(
  identifier: string,
  url: string,
) {
  void send(identifier, "Welcome to newslater.", ReactMail(identifier, url));
}

const ReactMail = (identifier: string, url: string) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-3 flex h-screen flex-col items-center">
          <Card>
            <CardContent>
              <div className="flex flex-col">
                <Img
                  src="https://i.ibb.co/c690ymG/newslater.png"
                  alt="newslater"
                  style={{ width: "200px" }}
                />
                <h1 className="text-2xl font-bold">Your Magic Link</h1>
                <p>
                  We are thrilled to welcome you. Click the button below to sign
                  in to newslater.
                </p>
                <Button
                  className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                  href={url}
                >
                  Sign in to newslater.
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 text-xs text-muted-foreground">
              <Text className="text-[12px] leading-[24px] text-[#666666]">
                This invitation was intended for{" "}
                <span className="text-black">{identifier}</span>. If you were
                not expecting this invitation, you can ignore this email. This
                link will only be valid for the next 5 minutes. If the link does
                not work, please follow the below url:
                https://newslater.vercel.app/signin.
              </Text>
            </CardFooter>
          </Card>
        </Body>
      </Tailwind>
    </Html>
  );
};
