import authConfig from "@/server/auth/auth.config";
import { db } from "@/server/db";
import { auth_accounts, auth_sessions, auth_users, auth_verification_token } from "@/server/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import { Adapter } from "next-auth/adapters";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://authjs.dev/getting-started/typescript
 */
declare module "next-auth" {
    interface Session {
        user: {
            settings: {
                isAdmin: boolean;
            }
        } & DefaultSession["user"]
    }
}

export const {auth, handlers, signIn, signOut} = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: auth_users,
        accountsTable: auth_accounts,
        sessionsTable: auth_sessions,
        verificationTokensTable: auth_verification_token,
    }) as Adapter,
    callbacks: {
        async session({session, user}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    // @ts-ignore todo: fix this
                    isAdmin: user.settings.isAdmin ?? false
                }
            }
        }
    },
    pages: {
        signIn: '/account',
        error: '/account'
    },
    ...authConfig
});
