import GithubProvider from "next-auth/providers/github";
import EmailProvider from 'next-auth/providers/email';
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { env } from "@/env";
import { db } from "@/server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accountsAuth, sessionsAuth, usersAuth, verificationTokensAuth } from "@/server/db/schema";
import emailForMagicLink from "@/server/auth/sendVerificiationRequestEmail";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db, {
        usersTable: usersAuth,
        accountsTable: accountsAuth,
        sessionsTable: sessionsAuth,
        verificationTokensTable: verificationTokensAuth,
    }) as Adapter,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest({identifier, url}) {
                emailForMagicLink(identifier, url)
            }
        }),
    ],
    callbacks:{
        async signIn({ user, account, profile, email, credentials }) {
            console.log('signIn')
            return true
        },
        async redirect({ url, baseUrl }) {
            console.log('redirect')
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async session({ session, user, token }) {
            console.log('session')
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('jwt')
            return token
        }
    }
}