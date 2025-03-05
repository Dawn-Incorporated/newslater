import { pgTable, varchar, timestamp, foreignKey, text, jsonb, primaryKey, integer } from "drizzle-orm/pg-core"

export const feeds = pgTable("feeds", {
	url: varchar({ length: 255 }).primaryKey().notNull(),
	name: varchar({ length: 255 }),
	description: varchar({ length: 255 }),
	website: varchar({ length: 255 }),
	category: varchar({ length: 255 }),
	dateAdded: timestamp("date_added", { mode: 'string' }),
	dateVerified: timestamp("date_verified", { mode: 'string' }),
});

export const authSessions = pgTable("auth_sessions", {
	sessionToken: text("session_token").primaryKey().notNull(),
	userId: text("user_id").notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [authUsers.userId],
		name: "auth_sessions_user_id_auth_users_user_id_fk"
	}).onDelete("cascade"),
]);

export const authUsers = pgTable("auth_users", {
	userId: text("user_id").primaryKey().notNull(),
	name: text(),
	email: text().notNull(),
	emailVerified: timestamp("email_verified", { mode: 'string' }),
	image: text(),
	settings: jsonb().default({ "sendtime": "06:00:00", "postlimit": "-1" }),
});

export const follow = pgTable("follow", {
	userId: varchar("user_id", { length: 255 }).notNull(),
	url: varchar({ length: 255 }).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [authUsers.userId],
		name: "follow_user_id_auth_users_user_id_fk"
	}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
		columns: [table.url],
		foreignColumns: [feeds.url],
		name: "follow_url_feeds_url_fk"
	}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.url], name: "pk_follow" }),
]);

export const authVerificationToken = pgTable("auth_verification_token", {
	userId: text("user_id").notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.userId, table.token], name: "auth_verification_token_user_id_token_pk" }),
]);

export const authAccounts = pgTable("auth_accounts", {
	userId: text("user_id").notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text("provider_account_id").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [authUsers.userId],
		name: "auth_accounts_user_id_auth_users_user_id_fk"
	}).onDelete("cascade"),
	primaryKey({ columns: [table.provider, table.providerAccountId], name: "auth_accounts_provider_provider_account_id_pk" }),
]);
