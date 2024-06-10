import { FeedContent, FeedHeader } from "@/app/(pages)/feeds/[feed]/server";

export default function FeedDetail({params}: {params: {feed: string}}) {
    const feed = params.feed

    return (
        <div className="mx-12 my-4">
            <FeedHeader feed={feed}/>
            <FeedContent url={feed}/>
        </div>
    )
}