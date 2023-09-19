const FeedRepository = require('../model/FeedRepository');
const Parser = require('rss-parser');

const feed = new FeedRepository();

function getByName(req, res) {
    feed.getByName(req, res);
}

function create(req, res) {
    feed.create(req, res);
}

function retrieveFeed(req, res) {
    if (!req.query.link.includes('http')) return res.status(400).send([]);

    (async () => {
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
            res.status(200).send(publication);

        });

    })();
}


module.exports = {
    create,
    retrieveFeed
}