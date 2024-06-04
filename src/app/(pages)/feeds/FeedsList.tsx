'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { getFeed } from "@/server/db/action/feedsActions";
import { CheckCircledIcon } from '@radix-ui/react-icons'


export default function FeedsList({readFeed}: { readFeed: Function }) {
    return (
        <div className="flex flex-row justify-end gap-2">
            <div className="flex flex-col max-sm:w-full max-h-full overflow-y-auto">
                <Tabs>
                    <TabsList className="flex flex-col h-full w-full">
                        <Suspense fallback={ <p className="!w-full">Loading...</p> }>
                            <Feeds readFeed={ readFeed }/>
                        </Suspense>
                    </TabsList>
                </Tabs>
            </div>
        </div>
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
            const response = await getFeed();
            setFeeds(response);
        } catch (err: Error | any) {
            const error = err?.message || "Unknown error occurred.";
            setError(error);
            toast.error(`An error occurred.`, {
                description: error
            });
        }
    }

    if (error) {
        return <p>An error occurred.</p>;
    }

    if (!feeds) {
        return <p className="!w-full">Loading...</p>;
    }

    return feeds.map((feed: any) => {
        const verified = feed.date_verified ? <CheckCircledIcon /> : '';

        return (
            <TabsTrigger
                key={ feed.url }
                onClick={ () => readFeed(feed.url) }
                value={ feed.url }
                className="w-full block text-left text-ellipsis"
            ><span className={"flex flex-row gap-2 items-center"}>{ verified }{ feed.name || feed.url }</span></TabsTrigger>
        )
    });
}