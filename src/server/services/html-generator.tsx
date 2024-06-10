import React, { Fragment } from 'react';
import { Img, Tailwind } from "@react-email/components";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { libre_baskerville } from "@/components/fonts";

interface Publication {
    title: string;
    creator?: string;
    description?: string;
    pubDate?: string;
    websiteLink?: string;
    websiteTitle?: string;
    content: string;
    link: string;
}

export default function MailHTML(name: string, feeds: any[]) {
    return (
        <Tailwind>
            <div>
                <div className={"flex justify-center mb-12"}>
                    <Img className={"w-[200px]"} src="https://i.ibb.co/c690ymG/newslater.png" alt="newslater"/>
                </div>
                {feeds.map((feed) => (
                    (feed && feed.length > 0) ? (
                        <>
                            <h1 className={cn("flex justify-center text-3xl mb-5 font-bold", libre_baskerville.className)}>{feed[0].websiteTitle}</h1>
                            <div className={"grid gap-6"} style={{gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'}}>
                                {makeFeed(feed)}
                            </div>
                        </>
                    ) : null
                ))}
            </div>
        </Tailwind>
    );
};

function makeFeed(publications: Publication[]) {
    return (
        <>
            {publications.map((publication, index) => (
                <div className={"mb-6 flex"} key={index}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{publication.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mail-subtitle" key={index}>
                                {makeSubtitles(publication)}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <p className={"leading-6 text-neutral-600"} dangerouslySetInnerHTML={{__html: publication.content}}></p>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </>
    );
}

function makeSubtitles(publication: Publication): (string | JSX.Element)[] {
    let subtitles: (string | JSX.Element)[] = [];
    if (publication.creator) subtitles.push(publication.creator);
    if (publication.description) subtitles.push(publication.description);
    if (publication.pubDate) {
        const formattedDate = new Date(publication.pubDate).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        subtitles.push(formattedDate);
    }
    if (publication.websiteLink && publication.websiteTitle) {
        subtitles.push(
            <a className={"no-underline text-blue-400"} href={publication.websiteLink} key="websiteLink">
                {publication.websiteTitle}
            </a>
        );
    }
    return subtitles.map((subtitle, index) => (
        <Fragment key={index}>
            {subtitle}
            {index < subtitles.length - 1 ? ' - ' : ''}
        </Fragment>
    ));
}