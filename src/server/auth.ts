import GithubProvider from "next-auth/providers/github";
import EmailProvider from 'next-auth/providers/email';
import { NextAuthOptions } from "next-auth";
import { env } from "@/env";
import { db } from "@/server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accountsAuth, sessionsAuth, usersAuth, verificationTokensAuth } from "@/server/db/schema";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db, {
        usersTable: usersAuth,
        accountsTable: accountsAuth,
        sessionsTable: sessionsAuth,
        verificationTokensTable: verificationTokensAuth,
    }),
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
        }),
    ]
}