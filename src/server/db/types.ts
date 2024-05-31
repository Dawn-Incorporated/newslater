import { auth_accounts, auth_sessions, auth_users, auth_verification_token, feeds, follow, settings } from "@/server/db/schema";

export type FeedType = typeof feeds.$inferInsert;
export type FollowType = typeof follow.$inferInsert;
export type UserType = typeof auth_users.$inferInsert;
export type AccountsType = typeof auth_accounts.$inferInsert;
export type SessionsType = typeof auth_sessions.$inferInsert;
export type VerificationTokenType = typeof auth_verification_token.$inferInsert;
export type SettingsType = typeof settings.$inferInsert;