import { FeedContent, FeedHeader } from "@/app/(pages)/feeds/[feed]/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedDetail({params}: {params: {feed: string}}) {
    const feed = params.feed

    return (
        <div className="flex flex-col mx-12 my-4 h-[calc(100vh-6rem)]">
            <Suspense fallback={<Skeleton className="h-16 w-full"/>}>
                <FeedHeader feed={feed}/>
            </Suspense>
            <Suspense fallback={<Skeleton className="h-52 w-full"/>}>
                <FeedContent url={feed}/>
            </Suspense>
        </div>
    )
}