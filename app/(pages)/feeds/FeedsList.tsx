'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

export default function FeedsList({readFeed}: { readFeed: Function }) {
    return (
        <>
            <Tabs>
                <TabsList className="flex flex-col w-full h-full">
                    <Suspense fallback={ <p>Loading...</p> }>
                        <Feeds readFeed={ readFeed }/>
                    </Suspense>
                </TabsList>
            </Tabs>
        </>
    )
}

function Feeds({readFeed}: { readFeed: Function }) {
    const [feeds, setFeeds] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFeeds();
    }, []);

    const fetchFeeds = async () => {
        try {
            const response = await fetch(`/api/v1/feed/readAll`);
            const data = await response.json();
            setFeeds(data);
        } catch (err) {
            const error = err?.message || "Unknown error occurred.";
            setError(error);
            toast.error(`An error occurred.`,  {
                description: error
            });
        }
    }

    if (error) {
        return <p>An error occurred.</p>;
    }

    if (!feeds) {
        return <p>Loading...</p>;
    }

    return feeds.map((feed: any) => (
        <TabsTrigger
            key={ feed.url }
            onClick={ () => readFeed(feed.url) }
            value={ feed.url }
            className="w-full block text-left text-ellipsis"
        >{ feed.name }</TabsTrigger>
    ));
}