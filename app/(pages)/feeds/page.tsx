'use client'

import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import FeedsList from "@/app/(pages)/feeds/FeedsList";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, PlusIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function PreviewFeeds() {
    const [feed, setFeed] = useState<any | null>(null)

    const readFeed = async (url: string) => {
        const response = await fetch(`/api/v1/feed/preview?url=${ url }`)
            .then(response => response.json())
            .then(data => {
                setFeed(data)

                const currentUrl = new URL(window.location.href)
                currentUrl.searchParams.set('feedUrl', url)
                window.history.pushState({}, '', currentUrl.toString())
            })
    }

    useEffect(() => {
        const currentUrl = new URL(window.location.href)
        const feedUrl = currentUrl.searchParams.get('feedUrl')
        if (feedUrl) {
            readFeed(feedUrl)
        }
    }, []);

    return (
        <>
            <div className="flex flex-row w-full h-[calc(100vh-4rem)]">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={ 25 } maxSize={ 30 }>
                        <div className="flex flex-col h-[calc(100vh-4rem)] p-5 gap-2">
                            <div className="flex flex-col w-full gap-2">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator/>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">Feeds</BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                                <h1 className="text-2xl font-bold">Feeds</h1>
                            </div>
                            <div className="flex flex-col w-full overflow-auto">
                                <FeedsList readFeed={ readFeed }/>
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle/>
                    <ResizablePanel defaultSize={ 75 }>
                        <div className="flex flex-col max-sm:w-full p-5 max-h-screen overflow-y-auto">
                            { feed ? (
                                    <div className="flex flex-col gap-8">
                                        <div className="flex justify-between">
                                            <div>
                                                <h1 className="flex text-3xl font-bold">{ feed[0]?.websiteTitle }</h1>
                                                <Link href={ feed[0]?.websiteLink || "#" }>Visit Website</Link>
                                            </div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="secondary">
                                                            <PlusIcon size={ 24 } className="mr-2 -ml-2"/>
                                                            Follow
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        You&apos;ll receive updates every day, on 6 a.m.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>

                                        { feed.map((item: any) => (
                                            <Card key={ item.title.concat(item.pubDate) }>
                                                <CardHeader>
                                                    <CardTitle className="text-xl">{ item.title }</CardTitle>
                                                    <CardDescription>{ item.creator ? item.creator + ' - ' : '' } { new Date(item.pubDate).toLocaleString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    }) }</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p dangerouslySetInnerHTML={ item.content ? {__html: item.content} : undefined }></p>
                                                </CardContent>
                                                { item.link && (
                                                    <CardFooter>
                                                        <Link href={ item.link } target="_blank" className="flex justify-center align-center">
                                                            <Button>Read full article <ExternalLinkIcon size={ 15 } className="ml-2"/></Button>
                                                        </Link>
                                                    </CardFooter>
                                                ) }
                                            </Card>
                                        )) }
                                    </div>
                                ) :
                                <h1 className="m-auto h-[calc(100vh-4rem)] flex items-center font-bold text-2xl animate-pulse">
                                    {new URL(window.location.href).searchParams.get('feedUrl') ? 'Loading...' : 'Select a feed to get started.'}
                                </h1>
                            }
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}
export const dynamic = 'force-dynamic'