'use client'

import { Suspense, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import FeedsList, { NameIndex } from "@/app/(pages)/feeds/FeedsList";
import MobileFeedsList from "@/app/(pages)/feeds/MobileFeedsList";
import { toast } from "sonner";
import FeedHeader from "@/components/custom/feeds/header/FeedHeader";
import FeedItem from "@/app/(pages)/feeds/FeedItem";

export default function PreviewFeeds() {
    const [feed, setFeed] = useState<any | null>(null);

    const readFeed = async (url: string) => {
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
                                <div className="w-full hidden md:block pr-1">
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
                            <Suspense fallback={ <p>Loading...</p> }>
                                <FeedContent feed={ feed }/>
                            </Suspense>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}

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

export const dynamic = 'force-dynamic'