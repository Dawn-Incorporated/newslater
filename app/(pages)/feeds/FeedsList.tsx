'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

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
            <NameIndex/>
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
            const response = await fetch(`/api/v1/feed/readAll`);
            const data = await response.json();
            setFeeds(data);
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
        const firstChar = (feed.name || feed.url).charAt(0).toUpperCase();

        return (
            <TabsTrigger
                key={ feed.url }
                id={ /^[A-Z]$/.test(firstChar) ? firstChar : '#' }
                onClick={ () => readFeed(feed.url) }
                value={ feed.url }
                className="w-full block text-left text-ellipsis"
            >{ feed.name || feed.url }</TabsTrigger>
        )
    });
}

export function NameIndex() {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-[85svh] fixed translate-x-4">
                { 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char) => (
                    <Link key={ char } href="#" onClick={ () => scrollTo(char) }>{ char }</Link>
                ))
                }
            </div>
        </>
    )
}