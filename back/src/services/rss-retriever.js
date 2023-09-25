const Parser = require("rss-parser");
const {log} = require("byarutils/lib/logger");

/**
 * Retrieves the feed from a source.
 * @param link source
 * @returns {Promise<*[]>}
 */
function retrieveFeed(link) {
    if (!link.includes('http')) return Promise.resolve([]);

    return new Parser().parseURL(link)
        .then(feed => {
            let publication = [];
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
}

/**
 * Retrieves publications from all the sources
 * @param links feeds
 * @returns {Promise<Awaited<unknown>[] | *[]>}
 */
function retrieveFeeds(links) {
    return Promise.all(links.map(link => retrieveFeed(link)))
        .catch(error => {
            log("ERROR", "RSS Retriever", "An error occurred during RSS feeds retrieval. " + error);
            return [];
        });
}

module.exports = {
    retrieveFeeds
}