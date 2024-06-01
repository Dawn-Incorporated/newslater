'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { addFeed, checkFollowed, removeFeed } from "@/server/db/action/followActions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function FeedHeader({feed, url}: { feed: any, url: string | null }) {
    return feed && (
        <div className="flex md:flew-col flex-row justify-between">
            <h1 className="flex text-3xl font-bold">{ feed[0]?.websiteTitle || feed[0]?.websiteLink || "" }</h1>
            <div className="flex flex-row-reverse gap-4">
                <FollowButton link={ url }/>
                { feed[0]?.websiteLink && <WebsiteLink link={ feed[0]?.websiteLink }/> }
            </div>
        </div>
    )
}


function FollowButton({link}: { link: string | null }) {
    const {data: session, status} = useSession()
    const [followed, setFollowed] = useState(false)

    const isFollowed = async (url: string) => {
        if (session?.user?.email) {
            const followed = await checkFollowed(session.user.email, url)
            setFollowed(followed.length > 0)
        }
    }

    const addFeedToFollow = async (url: string) => {
        if (session?.user?.email && url) {
            const add = await addFeed(session.user.email, url)
            if (add) {
                setFollowed(true)
            }
        }
    }

    const removeFeedFromFollow = async (url: string) => {
        if (session?.user?.email && url) {
            const remove = await removeFeed(session.user.email, url)
            if (remove) {
                setFollowed(false)
            }
        }
    }

    useEffect(() => {
        if (status === 'authenticated' && link) {
            isFollowed(link)
        }
    }, [link, status])


    return (
        <TooltipProvider>
            <Tooltip>
                { status === 'authenticated' ?
                    <TooltipTrigger asChild>
                        { followed ?
                            <Button onClick={ () => removeFeedFromFollow(link ?? '') }>
                                Unfollow
                                <MinusIcon size={ 24 } className="ml-2"/>
                            </Button>
                            :
                            <Button onClick={ () => addFeedToFollow(link ?? '') }>
                                Follow
                                <PlusIcon size={ 24 } className="ml-2"/>
                            </Button>
                        }
                    </TooltipTrigger>
                    : '' }
                <TooltipContent>
                    You&apos;ll receive updates every day, on 6 a.m.
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function WebsiteLink({link}: { link: string }) {
    return (
        <Link href={ link } target="_blank" className="flex justify-center align-center">
            <Button variant="secondary">Visite Website <ExternalLinkIcon size={ 15 } className="ml-2"/></Button>
        </Link>
    )
}