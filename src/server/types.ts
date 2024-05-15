export type FeedFromDB = {
    url: string;
    name: string|null;
    description: string|null;
    website: string|null;
    categorie: string|null;
}

export type FeedFromRSSRetriever = {
    websiteTitle: string|null;
    websiteLink: string|null;
    title: string|null;
    link: string|null;
    image: string|null;
    pubDate: string|null;
    creator: string|null;
    content: string|null;
    description: string|null;
}