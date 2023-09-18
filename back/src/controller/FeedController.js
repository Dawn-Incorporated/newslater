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
    let parser = new Parser();

    (async () => {

        let feed = await parser.parseURL(req.link);
        let publication = [];

        feed.items.forEach(item => {
            publication.push({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                creator: item.creator,
                content: item.content
            });
        });
        res.send(publication);
    })();
}


module.exports = {
    create,
    retrieveFeed
}