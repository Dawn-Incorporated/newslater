"use server"

const {logger} = require("byarutils");

/**
 * Filter the feeds according to the user's preferences
 * @param userFeeds the user's feeds
 * @param postLimit the number of posts the user wants to receive.
 * If the number is -1, the user wants to receive all the posts.
 * If the number is -2, the user wants to receive the posts between now and yesterday. @see userFeeds.pubDate
 */
async function filter(userFeeds, postLimit) {
    let filteredFeeds = [];

    try {
        // If the user wants to receive all the posts
        if (postLimit === -1) {
            filteredFeeds = userFeeds;
        }
        // If the user wants to receive the posts between now and yesterday
        else if (postLimit === -2) {
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            for (let feed of userFeeds) {
                let feedFiltered = [];
                for (let publication of feed) {
                    if (new Date(publication.pubDate) >= yesterday) {
                        feedFiltered.push(publication);
                    }
                }
                filteredFeeds.push(feedFiltered);
            }
        }
        // If the user wants to receive a specific number of posts
        else {
            for (let feed of userFeeds) {
                let feedFiltered = [];
                for (let i = 0; i < postLimit; i++) {
                    feedFiltered.push(feed[i]);
                }
                filteredFeeds.push(feedFiltered);
            }
        }
        return filteredFeeds;
    } catch (error) {
        logger.log('ERROR', 'RSS Filter', 'An error occurred during RSS feeds filtering. ' + error);
        return [];
    }
}

module.exports = {
    filter
}