"use server"

import { auth_users, follow } from "@/server/db/schema";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";


export const checkFollowed = async (email: string, url: string) => {

    return await db.select()
        .from(follow)
        .innerJoin(auth_users, eq(auth_users.id, follow.userId))
        .where(
            and(
                eq(follow.url, url),
                eq(auth_users.email, email)
            ))
}

export const addFeed = async (email: string, url: string) => {
    const userId = await db.select({id: auth_users.id}).from(auth_users).where(eq(auth_users.email, email))
    return await db.insert(follow).values({userId: userId[0].id, url: url})
}

export const removeFeed = async (email: string, url: string) => {
    const userId = await db.select({id: auth_users.id}).from(auth_users).where(eq(auth_users.email, email))
    return await db.delete(follow).where(
        and(
            eq(follow.url, url),
            eq(follow.userId, userId[0].id)
        ))
}

