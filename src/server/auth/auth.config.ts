import { env } from "@/env";
import emailForMagicLink from "@/server/auth/sendVerificiationRequestEmail";
import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend"

export default {
    providers: [
        Resend({
            server: env.EMAIL_HOST,
            from: env.EMAIL_FROM,
            sendVerificationRequest({identifier, url}) {
                void emailForMagicLink(identifier, url)
            }
        }),
        Github, Google
    ]
} satisfies NextAuthConfig;