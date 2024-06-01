"use server"

import { auth_users, follow } from "@/server/db/schema";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { FollowType } from "@/server/db/types";


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

export const addFeed = async (followed: FollowType) => {
    await db.insert(follow).values(followed)
}

