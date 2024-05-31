import { integer, pgTable, primaryKey, text, timestamp, varchar, jsonb } from "drizzle-orm/pg-core"
import { AdapterAccountType } from "@auth/core/adapters";


export const feeds = pgTable("feeds", {
    url: varchar("url", {length: 255}).primaryKey().notNull(),
    name: varchar("name", {length: 255}),
    description: varchar("description", {length: 255}),
    website: varchar("website", {length: 255}),
    categorie: varchar("categorie", {length: 255}),
    date_added: timestamp("date_added"),
});

export const follow = pgTable("follow", {
        userId: varchar("user_id", {length: 255}).notNull().references(() => auth_users.id, {onDelete: "cascade", onUpdate: "cascade"}),
        url: varchar("url", {length: 255}).notNull().references(() => feeds.url, {onDelete: "cascade", onUpdate: "cascade"}),
    },
    (table) => {
        return {
            pk_follow: primaryKey({columns: [table.userId, table.url], name: "pk_follow"}),
        }
    });

export const auth_users = pgTable("auth_users", {
    id: text("user_id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("email_verified", {mode: "date"}),
    image: text("image"),
})

export const auth_accounts = pgTable("auth_accounts", {
        userId: text("user_id").notNull().references(() => auth_users.id, {onDelete: "cascade"}),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("provider_account_id").notNull(),
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

export const auth_sessions = pgTable("auth_sessions", {
    sessionToken: text("session_token").primaryKey(),
    userId: text("user_id").notNull().references(() => auth_users.id, {onDelete: "cascade"}),
    expires: timestamp("expires", {mode: "date"}).notNull(),
})

export const auth_verification_token = pgTable("auth_verification_token", {
        identifier: text("user_id").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", {mode: "date"}).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
    })
)

export const settings = pgTable("settings", {
    userId: text("user_id").notNull().references(() => auth_users.id, {onDelete: "cascade"}),
    setting: jsonb("setting").notNull(),
})