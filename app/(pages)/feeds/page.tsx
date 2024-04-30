'use client'

import {useEffect, useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb";

export default function PreviewFeeds() {
    const [feeds, setFeeds] = useState([] as any)
    const [feed, setFeed] = useState([] as any)

    const readAllFeeds = async () => {
        const response = await fetch(`/api/v1/feed/readAll`)
            .then(response => response.json())
            .then(data => {
                setFeeds(data)
            })
    }

    const readFeed = async (url: string) => {
        const response = await fetch(`/api/v1/feed/preview?url=${url}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setFeed(data)
            })
    }

    useEffect(() => {
        readAllFeeds()
        readFeed('https://9to5mac.com/feed')
    }, []);


    return (
        <>
            <div className={"absolute top-10 left-10 max-sm:hidden"}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Feed</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className={"flex w-full mt-10 mb-10 justify-center"}>
                <Select onValueChange={(e) => readFeed(e)} defaultValue={'https://9to5mac.com/feed'}>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Feeds"/>
                    </SelectTrigger>
                    <SelectContent>
                        {feeds.map((feed: any) => (
                            <SelectItem key={feed.url} value={feed.url}>{feed.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className={"flex flex-col m-auto w-2/3 max-sm:w-full p-5"}>
                {feed.map((item: any) => (
                    <>
                        <div key={item.link}>
                            <h2 className={"flex text-xl font-bold justify-center mb-5"}>{item.title}</h2>
                            <p className={"flex flex-col items-center text-muted-foreground"}>{item.creator ? item.creator + ' -' : ''} {new Date(item.pubDate).toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}</p>
                            <div className={"flex flex-row justify-center text-muted-foreground mb-10 gap-4"}>
                                <a href={item.link} target={"_blank"}>Acticle</a> - <a href={item.websiteLink} target={"_blank"}> Website</a>
                            </div>
                            <p className={"mb-5 p-5 rounded bg-neutral-100"} dangerouslySetInnerHTML={item.content ? {__html: item.content} : undefined}></p>
                        </div>
                        <hr className={"m-7 border-black"}/>
                    </>
                ))}
            </div>

        </>
    )

}
export const dynamic = 'force-dynamic'
