import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function FeedHeader({feed}: { feed: any }) {
    return (
        <div className="flex md:flew-col flex-row justify-between">
            <h1 className="flex text-3xl font-bold">{ feed[0]?.websiteTitle || feed[0]?.websiteLink || "" }</h1>
            <div className="flex flex-row-reverse gap-4">
                <FollowButton/>
                { feed[0]?.websiteLink && <WebsiteLink link={ feed[0]?.websiteLink }/> }
            </div>
        </div>
    )
}

function FollowButton() {
    return (
        <Button>
            Follow
            <PlusIcon size={ 24 } className="ml-2"/>
        </Button>
    )
}

function WebsiteLink({link}: { link: string }) {
    return (
        <Link href={ link } target="_blank" className="flex justify-center align-center">
            <Button variant="secondary">Visite Website <ExternalLinkIcon size={ 15 } className="ml-2"/></Button>
        </Link>
    )
}