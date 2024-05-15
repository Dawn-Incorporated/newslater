import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { env } from "@/env";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET
        })
    ]
}