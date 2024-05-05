'use client'

import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        const response = await fetch(`/api/v1/feed/preview?url=${ url }`)
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
            <div className="flex flex-row w-full h-[calc(100vh-4rem)]">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={ 25 } maxSize={ 30 }>
                        <div className="flex flex-col h-[calc(100vh-4rem)] p-5 gap-4">
                            <div className="w-full">
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
                            </div>
                            <div className="flex flex-col gap-2 w-full overflow-auto">
                                <h1 className="text-2xl font-bold">Feeds</h1>
                                {/*<Select onValueChange={ (e) => readFeed(e) } defaultValue={ 'https://9to5mac.com/feed' }>*/ }
                                {/*    <SelectTrigger className="w-[300px]">*/ }
                                {/*        <SelectValue placeholder="Feeds"/>*/ }
                                {/*    </SelectTrigger>*/ }
                                {/*    <SelectContent>*/ }
                                {/*        { Array.isArray(feeds) ? feeds.map((feed: any) => (*/ }
                                {/*            <SelectItem key={ feed.url } value={ feed.url }>{ feed.name }</SelectItem>*/ }
                                {/*        )) : null }*/ }
                                {/*    </SelectContent>*/ }
                                {/*</Select>*/ }
                                <Tabs>
                                    <TabsList className="flex flex-col w-full h-full">
                                        { Array.isArray(feeds) ? feeds.map((feed: any) => (
                                                <TabsTrigger
                                                    key={ feed.url }
                                                    onClick={ () => readFeed(feed.url) }
                                                    value={ feed.url }
                                                    className="w-full block text-left text-ellipsis"
                                                >{ feed.name }</TabsTrigger>
                                            )) :
                                            <p>No feeds found</p>
                                        }
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle/>
                    <ResizablePanel defaultSize={ 75 }>
                        <div className="flex flex-col m-auto max-sm:w-full p-5 max-h-screen overflow-y-auto">
                            { !feed ? feed.map((item: any) => (
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
                                <h1 className="m-auto h-[calc(100vh-4rem)] flex -center items-center font-bold text-2xl animate-pulse">Select a feed to get started.</h1>
                            }
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}
export const dynamic = 'force-dynamic'
