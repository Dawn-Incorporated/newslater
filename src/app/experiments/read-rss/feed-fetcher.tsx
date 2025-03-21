"use server"

import { db } from "@/db";
import { feeds } from "@/db/schema";
import { eq } from "drizzle-orm";

interface FeedData {
  id: string;
  url: string;
  name: string | null;
  description: string | null;
}

export async function getFeedById(id: string): Promise<FeedData | null> {
  try {    
    const result = await db.select().from(feeds).where(eq(feeds.id, id)).limit(1);
    
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching feed data:", error);
    return null;
  }
}
