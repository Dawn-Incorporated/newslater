import React, { Fragment } from 'react';

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

export default function MailHTML(firstname: string, feeds: any[]) {
    return (
        <div>
            <div className="logo">
                <img src="https://i.ibb.co/c690ymG/newslater.png" alt="newslater" style={{width: '200px'}}/>
            </div>
            {feeds.map((feed) => (
                (feed && feed.length > 0) ? (
                    <>
                        <h1>{feed[0].websiteTitle}</h1>
                        {makeFeed(feed)}
                    </>
                ) : null
            ))}
            <style>
                {`
                    .logo { display: flex; justify-content: center; margin-bottom: 50px;}
                    .hello {  display: flex; justify-content: center; margin-bottom: 20px;}
                    body { background-color: transparent;}
                    h2 { font-size: 24px; }
                    h1 { display: flex; justify-content: center;}
                    p, .subtitle { font-size: 16px; line-height: 1.5; color: #888; }
                    a { text-decoration: none; color: #0077cc; }
                    img { max-width: 100%; max-height: fit-content }
                    .feed { padding: 1.5rem; margin-bottom: 20px; margin-inline: 5px; border-radius: 0.75rem; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
                `}
            </style>
        </div>
    );
};

function makeFeed(publications: Publication[]) {
    return (
        <>
            {publications.map((publication, index) => (
                <div className="feed" key={index}>
                    <h2>{publication.title}</h2>
                    <div className="subtitle" key={index}>
                        {makeSubtitles(publication)}
                    </div>
                    <p dangerouslySetInnerHTML={{__html: publication.content}}></p>
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
            <a className="website" href={publication.websiteLink} key="websiteLink">
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