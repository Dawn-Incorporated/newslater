'use client'

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFeed } from "@/server/db/action/feedsActions";

export default function MobileFeedsList({readFeed}: { readFeed: Function }) {
    const [feeds, setFeeds] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchFeeds();
    }, []);

    const fetchFeeds = async () => {
        try {
            const response = await getFeed();
            setFeeds(response);
            setLoading(false);
        } catch (err: Error | any) {
            const error = err?.message || "Unknown error occurred.";
            setError(error);
            setLoading(false);
            toast.error(`An error occurred.`, {
                description: error
            });
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred.</p>;
    }

    if (!feeds) {
        return <p>No feeds available.</p>;
    }

    return (
        <>
            <Select onValueChange={(e) => readFeed(e)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a feed to get started." />
                </SelectTrigger>
                <SelectContent>
                    {
                        feeds.map((feed: any) => (
                            <SelectItem key={ feed.url } value={ feed.url } className="w-full block text-left !text-ellipsis" onClick={() => readFeed(feed.url)}>
                                { feed.name }
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </>
    )
}