"use server"

import {feeds, FeedType} from "@/server/db/schema";
import {db} from "@/server/db";


export const getFeed = async () => {
    return await db.select().from(feeds)
}

export const addFeed = async (feed: FeedType) => {
    await db.insert(feeds).values(feed)
}

