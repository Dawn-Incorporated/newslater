const Parser = require("rss-parser");
const {send} = require("../config/mailer");

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media:content', {keepArray: true}],
        ]

    }
});

/**
 * @param {string} link
 * @returns {string}
 */
async function retrieveFeed(link) {
    if (!link.includes('http')) return "";
    const feed = await parser.parseURL(link);
    let publication = [];
    feed.items.forEach(item => {
        publication.push({
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
}

module.exports = {
    retrieveFeed
}