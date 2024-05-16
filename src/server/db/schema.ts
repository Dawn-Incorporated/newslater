import { pgTable, varchar, time, integer, foreignKey, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const feeds = pgTable("feeds", {
	url: varchar("url", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	description: varchar("description", { length: 255 }),
	website: varchar("website", { length: 255 }),
	categorie: varchar("categorie", { length: 255 }),
});

export const users = pgTable("users", {
	login: varchar("login", { length: 255 }).primaryKey().notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	lastname: varchar("lastname", { length: 255 }).notNull(),
	firstname: varchar("firstname", { length: 255 }).notNull(),
	mail: varchar("mail", { length: 255 }).notNull(),
	sendtime: time("sendtime").default('06:00:00').notNull(),
	postlimit: integer("postlimit").default(-1).notNull(),
});

export const follow = pgTable("follow", {
	login: varchar("login", { length: 255 }).notNull().references(() => users.login, { onDelete: "cascade", onUpdate: "cascade" } ),
	url: varchar("url", { length: 255 }).notNull().references(() => feeds.url, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		pk_follow: primaryKey({ columns: [table.login, table.url], name: "pk_follow"}),
	}
});

export type FeedType = typeof feeds.$inferInsert;
export type UserType = typeof users.$inferInsert;
export type FollowType = typeof follow.$inferInsert;