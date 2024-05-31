"use server"

import { auth_users } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";

export const getUsers = async () => {
    return await db.select().from(auth_users)
}

export const updateUser = async (userEmail: string, name: string) => {
    return await db.update(auth_users).set({name}).where(eq(auth_users.email, userEmail))
}

export const getUsersWithFeeds = async () => {
    return await db.execute(sql`
        SELECT
            fo.user_id,
            u.name,
            u.email,
            JSON_AGG(fo.url) AS sources,
            (SELECT setting ->> 'sendtime' FROM settings s WHERE s.user_id = u.user_id) AS sendtime,
            (SELECT setting ->> 'postlimit' FROM settings s WHERE s.user_id = u.user_id) AS postlimit
        FROM
            follow fo
            JOIN feeds fe ON fo.url = fe.url
            JOIN auth_users u ON fo.user_id = u.user_id
        GROUP BY
            fo.user_id,
            u.name,
            u.email,
            u.user_id
    `);
};

