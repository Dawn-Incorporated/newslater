"use client"

import ArticleRenderer from "@/app/experiments/read-rss/article-renderer";
import { parseArticleContent } from "@/app/experiments/read-rss/rss-parser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { fetchRSS } from "@/lib/rss";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { type Feed } from "@rowanmanning/feed-parser/lib/feed/base";
import { useState } from "react";

export default function ReadRSSExperiment() {
    const [link, setLink] = useState<string>('https://9to5mac.com/rss');
    const [status, setStatus] = useState<'ok' | 'loading' | 'error' | 'idle'>('idle');
    const [feed, setFeed] = useState<Feed | null>(null);

    const retrieve = async () => {
        setStatus('loading');
        const response = await fetchRSS(link ?? "https://9to5mac.com/rss")

        if (!response) {
            setStatus('error');
            return;
        }

        setFeed(JSON.parse(response));
        setStatus('ok');
    }

    return (
        <div className="flex flex-col h-screen gap-4 p-4">
            <h1>Read RSS Experiment</h1>

            <div className="flex gap-4">
                <input
                    className="border border-gray-300 p-2 rounded"
                    onChange={(event) => setLink(event.target.value)}
                    placeholder="RSS Link"
                    type="text"
                    value={link}
                />

                <Button onClick={retrieve}>
                    Retrieve
                </Button>
            </div>

            {status === 'loading' && <p>Loading...</p>}
            {status === 'error' && <p>An error occurred.</p>}
            {status === 'idle' && <p>Input a feed to start.</p>}
            {feed ? <FeedData feed={feed} /> : <p>No feed to display</p>}
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
                console.log(article.description)
                const data = parseArticleContent(article.content ?? article.description ?? "");

                return (
                    <div key={index} className="flex w-full gap-4">
                        <ResizablePanelGroup direction="horizontal" className="m-2">
                            <ResizablePanel className="border rounded-2xl !m-2" >
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

    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold">articles</h2>
            {Object.entries(articles).map(([key, value]) => (
                <div key={key}>
                    <h2 className="font-bold">{key}</h2>
                    <pre>{JSON.stringify(value, null, 2)}</pre>
                </div>
            ))}
        </div>
    );
}