import React, { Fragment } from 'react';
import { Body, Head, Html, Img, Tailwind } from "@react-email/components";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { libre_baskerville } from "@/lib/fonts";

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

export function WrappedForMail(name: string, feeds: any[]) {
	return (
		<Html>
			<Head/>
			<Tailwind>
				<Body>
					<MailHTML name={name} feeds={feeds}/>
				</Body>
			</Tailwind>
		</Html>

	);
}

export function WrappedForPreview(name: string, feeds: Publication[]) {
	return (
		<Tailwind>
			<MailHTML name={name} feeds={feeds}/>
		</Tailwind>
	);
}

export function MailHTML({name, feeds}: {name: string; feeds: any[];}) {
	return (
		<div>
			<div className={"flex justify-center mb-12"}>
				<Img className={"w-[200px]"} src="https://i.ibb.co/c690ymG/newslater.png" alt="newslater"/>
			</div>
			{feeds.map((feed, index) => (
				(feed && feed.length > 0) ? (
					<>
						<h1 className={cn("flex justify-center text-3xl mb-5 font-bold", libre_baskerville.className)}>{feed[0].websiteTitle}</h1>
						<div key={index} className={"gap-6 flex flex-col"}>
							{makeFeed(feed)}
						</div>
					</>
				) : null
			))}
			<style>
				{`
				.feed-content img { max-width: 60%; display: block; margin: 10px auto; border-radius: 10px; shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
				`}
			</style>
		</div>
	);
}


function makeFeed(publications: Publication[]) {
	return (
		<>
			{publications.map((publication, index) => (
				<div key={index} className={"mb-6"}>
					<Card>
						<CardHeader>
							<CardTitle>{publication.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<div key={index}>
								{makeSubtitles(publication)}
							</div>
						</CardContent>
						<CardFooter>
							<div className={"leading-6 text-neutral-600 feed-content"} dangerouslySetInnerHTML={{__html: publication.content}}></div>
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