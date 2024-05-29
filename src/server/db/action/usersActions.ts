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
            fo.login, 
            u.lastname, 
            u.firstname, 
            u.mail, 
            json_agg(fo.url) AS sources, 
            u.sendtime, 
            u.postlimit
        FROM follow fo
        JOIN feeds fe ON fo.url = fe.url
        JOIN users u ON fo.login = u.login
        GROUP BY fo.login, u.lastname, u.firstname, u.mail, u.sendtime, u.postlimit
    `);
};
