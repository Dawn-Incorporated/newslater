"use server"

import { parseFeed } from '@rowanmanning/feed-parser';

export async function fetchRSS(link: string): Promise<string> {
    const response = await fetch(link);

    if (!response) throw new Error("This feed could not be found.");

    const feed = parseFeed(await response.text());
    
    return JSON.stringify(feed);
}