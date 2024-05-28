import { feeds, follow, users } from "@/server/db/schema";

export type FeedType = typeof feeds.$inferInsert;
export type UserType = typeof users.$inferInsert;
export type FollowType = typeof follow.$inferInsert;