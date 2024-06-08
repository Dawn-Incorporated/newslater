'use client'

import FeedContent from "@/app/(pages)/feeds/FeedContent";
import FeedHeader from "@/components/custom/feeds/header/FeedHeader";
import { useEffect, useState } from "react";

export default function FeedPage({params}: { params: { feed: string } }) {
    const url = decodeURIComponent(params.feed);

    const [feed, setFeed] = useState<any | null>(null);

    useEffect(() => {
        fetch(`/api/v1/feed/preview?url=${ url }`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                } else {
                    setFeed(data);
                }
            });
    }, []);

    return (
        <>
            <div className="mx-6 my-4">
                <FeedHeader feed={ feed } url={ url }/>
            </div>
            <FeedContent url={url} />
        </>
    )
}
