import { relations } from "drizzle-orm/relations";
import { feeds, follow, auth_users } from "./schema";

export const followRelations = relations(follow, ({one}) => ({
	feed: one(feeds, {
		fields: [follow.url],
		references: [feeds.url]
	}),
	user: one(auth_users, {
		fields: [follow.userId],
		references: [auth_users.id]
	}),
}));

export const feedsRelations = relations(feeds, ({many}) => ({
	follows: many(follow),
}));

export const usersRelations = relations(auth_users, ({many}) => ({
	follows: many(follow),
}));