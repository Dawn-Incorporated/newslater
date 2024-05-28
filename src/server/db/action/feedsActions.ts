"use server"

import {feeds} from "@/server/db/schema";
import {db} from "@/server/db";
import { FeedType } from "@/server/db/types";


export const getFeed = async () => {
    return await db.select().from(feeds)
}

export const addFeed = async (feed: FeedType) => {
    await db.insert(feeds).values(feed)
}

