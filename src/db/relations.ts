import { relations } from "drizzle-orm/relations";
import { authUsers, authSessions, follow, feeds, authAccounts } from "@/db/schema";

export const authSessionsRelations = relations(authSessions, ({ one }) => ({
	authUser: one(authUsers, {
		fields: [authSessions.userId],
		references: [authUsers.userId]
	}),
}));

export const authUsersRelations = relations(authUsers, ({ many }) => ({
	authSessions: many(authSessions),
	follows: many(follow),
	authAccounts: many(authAccounts),
}));

export const followRelations = relations(follow, ({ one }) => ({
	authUser: one(authUsers, {
		fields: [follow.userId],
		references: [authUsers.userId]
	}),
	feed: one(feeds, {
		fields: [follow.url],
		references: [feeds.url]
	}),
}));

export const feedsRelations = relations(feeds, ({ many }) => ({
	follows: many(follow),
}));

export const authAccountsRelations = relations(authAccounts, ({ one }) => ({
	authUser: one(authUsers, {
		fields: [authAccounts.userId],
		references: [authUsers.userId]
	}),
}));