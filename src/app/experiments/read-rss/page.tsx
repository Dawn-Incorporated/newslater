"use client"

import ArticleRenderer from "@/app/experiments/read-rss/article-renderer";
import { parseArticleContent } from "@/app/experiments/read-rss/rss-parser";
import { Button } from "@/components/ui/button";
import { fetchRSS } from "@/lib/rss";
import { type Feed } from "@rowanmanning/feed-parser/lib/feed/base";
import { useState } from "react";

export default function ReadRSSExperiment() {
    const [link, setLink] = useState<string>('https://9to5mac.com/rss');
    const [feed, setFeed] = useState<Feed | null>(null);
    
    const retrieve = async () => {
        const response = await fetchRSS(link ?? "https://9to5mac.com/rss")
        
        setFeed(JSON.parse(response));
    }
    
    return (
        <div className="flex flex-col h-screen gap-4 p-4">
            <h1>Read RSS Experiment</h1>
            
            <div className="flex gap-4">
                <input
                    className="border border-gray-300 p-2 rounded"
                    onChange={ (event) => setLink(event.target.value) }
                    placeholder="RSS Link"
                    type="text"
                    value={ link }
                />
                
                <Button onClick={ retrieve }>
                    Retrieve
                </Button>
            </div>
            
            <FeedData feed={ feed }/>
        </div>
    );
}

function FeedData({feed}: { feed: Feed | null }) {
    if (!feed) {
        return <p>No records found.</p>;
    }
    
    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            { Object.entries(feed).map(([key, value]) => {
                if (key === "items") {
                    return (
                        <div key={ key } className="">
                            <ArticleData articles={ value }/>
                        </div>
                    );
                }
                
                return (
                    <div key={ key }>
                        <h2 className="font-bold">{ key }</h2>
                        <pre>{ JSON.stringify(value, null, 2) }</pre>
                    </div>
                );
            }) }
        </div>
    );
}

function ArticleData({articles}: { articles: Feed["items"] }) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold">articles</h2>
            { articles.map((article, index) => {
                console.log(article.description)
                const data = parseArticleContent(article.content ?? article.description ?? "");
                
                return (
                    <div key={ index } className="flex w-full gap-4">
                        <article className="flex flex-col grow border-b border-gray-300 p-4 w-3xl max-w-3xl">
                            <h1 className="text-xl font-bold font-serif">{ article.title }</h1>
                            <ArticleRenderer components={ data }/>
                        </article>
                        
                        <div className="overflow-y-auto">
                            { Object.entries(data).map(([key, value]) => (
                                <div key={ key }>
                                    <h2 className="font-bold">{ key }</h2>
                                    <pre>{ JSON.stringify(value, null, 2) }</pre>
                                </div>
                            )) }
                        </div>
                    </div>
                )
            }) }
        </div>
    )
    
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold">articles</h2>
            { Object.entries(articles).map(([key, value]) => (
                <div key={ key }>
                    <h2 className="font-bold">{ key }</h2>
                    <pre>{ JSON.stringify(value, null, 2) }</pre>
                </div>
            )) }
        </div>
    );
}