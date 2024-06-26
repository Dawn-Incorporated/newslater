import { log } from "byarutils";
import Parser from "rss-parser";

/**
 * Retrieves the feed from a source.
 * @param link source
 * @returns {Promise<*[]>}
 */
export function retrieveFeed(link: string) {
    try {
        if (!link.includes('http')) return Promise.resolve([]);

        return new Parser().parseURL(link)
            .then(feed => {
                let publication: any[] = [];
                feed.items.forEach(item => {
                    publication.push({
                        websiteTitle: feed.title,
                        websiteLink: feed.link,
                        title: item.title,
                        link: item.link,
                        image: item.image,
                        pubDate: item.pubDate,
                        creator: item.creator,
                        content: item.content,
                        description: item.description
                    });
                });
                return publication;
            })
            .catch(error => {
                log("ERROR", "RSS Retriever", "An error occurred during RSS feed retrieval. " + error);
                return [];
            });
    } catch (error) {
        //addToPool(retrieveFeed, [link], 3);
    }
}

/**
 * Retrieves publications from all the sources
 * @param links feeds
 * @returns {Promise<Awaited<unknown>[] | *[]>}
 */
export function retrieveFeeds(links: string[]) {
    return Promise.all(links.map(link => retrieveFeed(link)))
        .catch(error => {
            log("ERROR", "RSS Retriever", "An error occurred during RSS feeds retrieval. " + error);
            return [];
        });
}