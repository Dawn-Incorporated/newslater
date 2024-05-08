'use client'

import { Suspense, useEffect, useState } from "react";

export default function FeedContent({url}: { url: string }) {
    const feed = FeedData(url);

    return (
        <div className="flex flex-col m-auto max-sm:w-full p-5 max-h-screen overflow-y-auto">
            <Suspense fallback={ <p>Loading...</p> }>
                { feed ? feed.map((item: any) => (
                        <>
                            <div key={ item.link }>
                                <h2 className={ "flex text-xl font-bold justify-center mb-5" }>{ item.title }</h2>
                                <p className={ "flex flex-col items-center text-muted-foreground" }>{ item.creator ? item.creator + ' -' : '' } { new Date(item.pubDate).toLocaleString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }) }</p>
                                <div className={ "flex flex-row justify-center text-muted-foreground mb-10 gap-4" }>
                                    <a href={ item.link } target={ "_blank" }>Acticle</a> - <a href={ item.websiteLink } target={ "_blank" }> Website</a>
                                </div>
                                <p className={ "mb-5 p-5 rounded bg-neutral-100" } dangerouslySetInnerHTML={ item.content ? {__html: item.content} : undefined }></p>
                            </div>
                            <hr className={ "m-7 border-black" }/>
                        </>
                    )) :
                    <h1 className="m-auto h-[calc(100vh-4rem)] flex items-center font-bold text-2xl animate-pulse">Select a feed to get started.</h1>
                }
            </Suspense>
        </div>
    );
}

export function useFeedData(url: string) {
    const [data, setData] = useState<any|null>(null);

    useEffect(() => {
        fetch(`/api/v1/feed/preview?url=${ url }`)
            .then(response => response.json())
            .then(data => setData(data));
    }, [url]);

    return data;
}

export function FeedData(url: string) {
    const data = useFeedData(url);

    if (data === null) {
        throw new Promise(resolve => setTimeout(resolve, 1000));
    }

    return data;
}