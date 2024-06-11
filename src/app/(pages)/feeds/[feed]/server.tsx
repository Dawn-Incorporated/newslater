import { FollowButton } from "@/components/app/feeds/feed-followed-button";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { feeds } from "@/server/db/schema";
import { FeedType } from "@/server/db/types";
import { eq } from "drizzle-orm";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { retrieveFeed } from "@/server/services/rss-retriever";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { libre_baskerville } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export async function FeedHeader({feed}: { feed: string }) {
    const data: FeedType = (await db.select().from(feeds).where(eq(feeds.url, decodeURIComponent(feed))))[0]

    const full_link = data.website?.includes("http") ? data.website : `https://${data.website}`

    return (
        <div className="flex md:flew-col flex-row justify-between my-6">
            <h1 className={cn("flex text-4xl font-bold", libre_baskerville.className)}>{ data.name ?? data.url ?? "" }</h1>
            <div className="flex flex-row gap-4">
                <WebsiteLink link={ full_link }/>
                <FollowButton link={ data.url }/>
            </div>
        </div>
    )
}

function WebsiteLink({link}: { link: string }) {
    return link && (
        <Link href={ link } target="_blank" className="flex justify-center align-center">
            <Button variant="secondary">Visite Website <ExternalLinkIcon size={ 15 } className="ml-2"/></Button>
        </Link>
    )
}


export async function FeedContent({url}: {url: string}) {
    const feed = await retrieveFeed(decodeURIComponent(url));

    return (
        <div className="grid sm:grid-cols-2 gap-6 max-h-screen overflow-y-auto">
            {feed ? feed.map((item: any) => (
                    <Card key={item.title.concat(item.pubDate)}>
                        <CardHeader>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <CardDescription>{item.creator ? item.creator + ' - ' : ''} {new Date(item.pubDate).toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p dangerouslySetInnerHTML={item.content ? {__html: item.content} : undefined}></p>
                        </CardContent>
                        {item.link && <FeedItemLink link={item.link}/>}
                    </Card>
                )) :
                <h1 className="m-auto h-[calc(100vh-4rem)] flex items-center font-bold text-2xl animate-pulse">Select
                    a feed to get started.</h1>
            }
        </div>
    );
}

function FeedItemLink({link}: {link: string}) {
    return (
        <CardFooter>
            <Link href={link} target="_blank" className="flex justify-center align-center">
                <Button>Read full article <ExternalLinkIcon size={15} className="ml-2"/></Button>
            </Link>
        </CardFooter>
    )
}