"use client"

import ArticleRenderer from "@/app/experiments/read-rss/article-renderer";
import { getFeedById } from "@/app/experiments/read-rss/feed-fetcher";
import { parseArticleContent } from "@/app/experiments/read-rss/rss-parser";
import { Badge } from "@/components/ui/badge";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { fetchRSS } from "@/lib/rss";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { type Feed } from "@rowanmanning/feed-parser/lib/feed/base";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReadRSSExperiment() {
    const searchParams = useSearchParams();
    const feedUuid = searchParams.get('s');

    const [feedInfo, setFeedInfo] = useState<{ name: string, url: string } | null>(null);
    const [status, setStatus] = useState<'ok' | 'loading' | 'error' | 'idle'>('idle');
    const [feed, setFeed] = useState<Feed | null>(null);

    // Load feed automatically when UUID is provided
    useEffect(() => {
        const loadFeedByUuid = async () => {
            if (feedUuid) {
                setStatus('loading');

                try {
                    const response = await getFeedById(feedUuid);

                    if (!response) {
                        setStatus('error');
                        return;
                    }
                    const feedData = response;

                    if (feedData?.url) {
                        setFeedInfo({
                            name: feedData.name || "Unnamed Feed",
                            url: feedData.url
                        });

                        const rssResponse = await fetchRSS(feedData.url);

                        if (!rssResponse) {
                            setStatus('error');
                            return;
                        }

                        setFeed(JSON.parse(rssResponse));
                        setStatus('ok');
                    } else {
                        setStatus('error');
                    }
                } catch (error) {
                    console.error("Error loading feed:", error);
                    setStatus('error');
                }
            } else {
                setStatus('idle');
            }
        };

        loadFeedByUuid();
    }, [feedUuid]);

    return (
        <div className="flex flex-col h-screen gap-4 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    {feedInfo?.name ? `Feed: ${feedInfo.name}` : "RSS Reader"}
                </h1>

                <Link href="/experiments/list-feeds" className="text-blue-500 hover:underline">
                    Back to Feed List
                </Link>
            </div>

            {feedInfo && (
                <div className="text-sm text-gray-500">
                    Source: <a href={feedInfo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{feedInfo.url}</a>
                </div>
            )}

            {status === 'loading' && <p className="text-center p-4">Loading feed content...</p>}
            {status === 'error' && <p className="text-center p-4 text-red-500">An error occurred while loading the feed.</p>}
            {status === 'idle' && <p className="text-center p-4">Select a feed from the list to view its content.</p>}
            {feed ? <FeedData feed={feed} /> : (status !== 'loading' && <p className="text-center p-4">No feed content to display</p>)}
        </div>
    );
}

function FeedData({ feed }: { feed: Feed }) {

    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            {Object.entries(feed).map(([key, value]) => {
                if (key === "items") {
                    return (
                        <div key={key} className="">
                            <ArticleData articles={value} />
                        </div>
                    );
                }

                return (
                    <div key={key}>
                        <h2 className="font-bold">{key}</h2>
                        <pre>{JSON.stringify(value, null, 2)}</pre>
                    </div>
                );
            })}
        </div>
    );
}

function ArticleData({ articles }: { articles: Feed["items"] }) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold">articles</h2>
            {articles.map((article, index) => {
                const data = parseArticleContent(article.content ?? article.description ?? "");

                return (
                    <div key={index} className="flex w-full gap-4">
                        <ResizablePanelGroup direction="horizontal" className="m-2">
                            <ResizablePanel className="border rounded-2xl !m-2">
                                <article className="flex flex-col grow border-b border-gray-300 p-4 max-w-3xl">
                                    <h1 className="text-xl font-bold font-serif">{article.title}</h1>
                                    <ArticleRenderer components={data} />
                                </article>
                            </ResizablePanel>

                            <ResizableHandle />

                            <ResizablePanel className="border bg-white rounded-2xl !m-2 invert">
                                <Collapsible>
                                    <CollapsibleTrigger className="p-4 font-bold">
                                        <div className="flex gap-2 cursor-pointer">
                                            <h2>Raw Data (click to expand/collapse)</h2>
                                            <Badge variant="outline">{Object.keys(data).length} items</Badge>
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="overflow-y-auto">
                                            {Object.entries(data).map(([key, value]) => (
                                                <div key={key} className="p-4">
                                                    <h2 className="font-bold">{key}</h2>
                                                    <pre>{JSON.stringify(value, null, 2)}</pre>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                )
            })}
        </div>
    )
}