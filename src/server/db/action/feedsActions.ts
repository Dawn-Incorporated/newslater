"use server"

import {feeds} from "@/server/db/schema";
import {db} from "@/server/db";
import { FeedType } from "@/server/db/types";
import { eq } from "drizzle-orm";


export const getFeed = async () => {
    return await db.select().from(feeds)
}

export const addFeed = async (feed: FeedType) => {
    await db.insert(feeds).values(feed)
}

export const verifyFeed = async (url: string) => {
    return await db.update(feeds).set({date_verified: new Date()}).where(eq(feeds.url, url))
}

export const deleteFeed = async (url: string) => {
    return await db.delete(feeds).where(eq(feeds.url, url))
}

