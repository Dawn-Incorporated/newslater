import { integer, pgTable, primaryKey, text, time, timestamp, varchar } from "drizzle-orm/pg-core"
import { AdapterAccountType } from "@auth/core/adapters";


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

export const usersAuth = pgTable("userAuth", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
})

export const accountsAuth = pgTable(
	"accountAuth",
	{
		userId: text("userId")
			.notNull()
			.references(() => usersAuth.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
)

export const sessionsAuth = pgTable("sessionAuth", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => usersAuth.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokensAuth = pgTable(
	"verificationTokenAuth",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	})
)