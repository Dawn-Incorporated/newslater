const Parser = require("rss-parser");

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media:content', {keepArray: true}],
        ]

    }
});

function retrieveFeed(link) {
    if (!link.includes('http')) return Promise.resolve([]);

    return new Parser().parseURL(link)
        .then(feed => {
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
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération du flux :", error);
            return [];
        });
}

module.exports = {
    retrieveFeed
}