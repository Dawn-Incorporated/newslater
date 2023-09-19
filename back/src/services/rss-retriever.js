const Parser = require("rss-parser");

function retrieveFeed(link) {
    if (!link.includes('http')) return;

    return (async () => {
        await new Parser().parseURL(link, (err, feed) => {
            if (err) return;

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
        });
    })();
}

function retrieveFeedTEST(req, res) {

    if (!req.query.link.includes('http')) return res.status(400).send([]);

    return (async () => {
        await new Parser().parseURL(req.query.link, (err, feed) => {
            if (err) return res.status(400).send([]);

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
            return res.status(200).send(publication);
        });
    })();
}


module.exports = {
    retrieveFeed,
    retrieveFeedTEST
}