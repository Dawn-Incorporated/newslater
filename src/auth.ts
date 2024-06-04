import authConfig from "@/server/auth/auth.config";
import { db } from "@/server/db";
import { auth_accounts, auth_sessions, auth_users, auth_verification_token } from "@/server/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";

export const {auth, handlers, signIn, signOut} = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: auth_users,
        accountsTable: auth_accounts,
        sessionsTable: auth_sessions,
        verificationTokensTable: auth_verification_token
    }) as Adapter,
    pages: {
        signIn: '/account',
        error: '/account'
    },
    ...authConfig
});
