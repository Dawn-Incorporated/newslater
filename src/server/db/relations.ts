import { relations } from "drizzle-orm/relations";
import { feeds, follow, users } from "./schema";

export const followRelations = relations(follow, ({one}) => ({
	feed: one(feeds, {
		fields: [follow.url],
		references: [feeds.url]
	}),
	user: one(users, {
		fields: [follow.login],
		references: [users.login]
	}),
}));

export const feedsRelations = relations(feeds, ({many}) => ({
	follows: many(follow),
}));

export const usersRelations = relations(users, ({many}) => ({
	follows: many(follow),
}));