import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

export default function FeedItem({item}: { item: any }) {
    return (
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
            { item.link && <FeedItemLink link={item.link} /> }
        </Card>
    )
}

function FeedItemLink({link}: { link: string }) {
    return (
        <CardFooter>
            <Link href={ link } target="_blank" className="flex justify-center align-center">
                <Button>Read full article <ExternalLinkIcon size={ 15 } className="ml-2"/></Button>
            </Link>
        </CardFooter>
    )
}