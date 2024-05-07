'use client'

<<<<<<< HEAD
import { Suspense, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import FeedsList from "@/app/(pages)/feeds/FeedsList";
import MobileFeedsList from "@/app/(pages)/feeds/MobileFeedsList";
import { toast } from "sonner";
import FeedHeader from "@/components/custom/feeds/header/FeedHeader";
import FeedItem from "@/app/(pages)/feeds/FeedItem";
=======
import { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import FeedsList from "@/app/(pages)/feeds/FeedsList";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, PlusIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MobileFeedsList from "@/app/(pages)/feeds/MobileFeedsList";
>>>>>>> main

export default function PreviewFeeds() {
    const [feed, setFeed] = useState<any | null>(null);

    const readFeed = async (url: string) => {
<<<<<<< HEAD
        try {
            if (!url) {
                setFeed(null)
                return;
            }

            await fetch(`/api/v1/feed/preview?url=${ url }`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    } else {
                        setFeed(data);
                    }
                });
        } catch (err: Error | any) {
            toast.error(`An error occurred.`, {
                description: err?.message || "Unknown error occurred."
            });
        }
=======
        const response = await fetch(`/api/v1/feed/preview?url=${ url }`)
            .then(response => response.json())
            .then(data => {
                setFeed(data);
            });
>>>>>>> main
    };

    return (
        <>
            <div className="flex flex-row w-full h-[calc(100vh-4rem)]">
                <ResizablePanelGroup direction="horizontal" className="md:!flex-row !flex-col">
                    <ResizablePanel minSize={ 15 } defaultSize={ 25 } maxSize={ 35 } className="md:!flex-[35] !flex-[15] md:border-b-0 border-b-[1px]">
                        <div className="flex flex-col md:h-[calc(100vh-4rem)] h-auto p-5 gap-2">
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
                                <div className="w-full hidden md:block">
                                    <FeedsList readFeed={ readFeed }/>
                                </div>
                                <div className="md:hidden">
                                    <MobileFeedsList readFeed={ readFeed }/>
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle/>
                    <ResizablePanel defaultSize={ 75 }>
                        <div className="flex flex-col max-sm:w-full p-5 max-h-screen overflow-y-auto">
<<<<<<< HEAD
                            <Suspense fallback={<p>Loading...</p>}>
                                <FeedContent feed={feed} />
                            </Suspense>
=======
                            { feed ? (
                                    <div className="flex flex-col gap-8">
                                        <div className="flex md:flew-col flex-row justify-between">
                                            <div>
                                                <h1 className="flex text-3xl font-bold">{ feed[0]?.websiteTitle }</h1>
                                                <Link href={ feed[0]?.websiteLink || "#" }>Visit Website</Link>
                                            </div>

                                            <div className="flex flex-row-reverse gap-4">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button>
                                                                Follow
                                                                <PlusIcon size={ 24 } className="ml-2"/>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            You&apos;ll receive updates every day, on 6 a.m.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                { feed[0]?.websiteLink && (
                                                    <Link href={ feed[0]?.websiteLink } target="_blank" className="flex justify-center align-center">
                                                        <Button variant="secondary">Visite Website <ExternalLinkIcon size={ 15 } className="ml-2"/></Button>
                                                    </Link>
                                                ) }
                                            </div>
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
                                    Select a feed to get started.
                                </h1>
                            }
>>>>>>> main
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}
<<<<<<< HEAD

function FeedContent({feed}: { feed: any }) {
    if (!feed) {
        return <h1 className="m-auto h-[calc(100vh-4rem)] flex items-center font-bold text-2xl animate-pulse">
            Select a feed to get started.
        </h1>
    }

    if (!Array.isArray(feed) || feed.length === 0) {
        return <h1 className="m-auto h-[calc(100vh-4rem)] flex items-center font-bold text-2xl animate-pulse">
            No feed items available.
        </h1>
    }

    return (
        <div className="flex flex-col gap-8">
            <FeedHeader feed={ feed }/>
            { feed.map((item: any, index: number) => <FeedItem key={ index } item={ item }/>) }
        </div>
    )
}

=======
>>>>>>> main
export const dynamic = 'force-dynamic'