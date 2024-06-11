"use client"

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { addFeed, checkFollowed, removeFeed } from "@/server/db/action/followActions";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";

export function FollowButton({link}: { link: string | null }) {
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
                revalidatePath("/")
            }
        }
    }

    const removeFeedFromFollow = async (url: string) => {
        if (session?.user?.email && url) {
            const remove = await removeFeed(session.user.email, url)
            if (remove) {
                setFollowed(false)
                revalidatePath("/")
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