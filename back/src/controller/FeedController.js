const FeedRepository = require('../model/FeedRepository');

const feed = new FeedRepository();

function getByName(req, res) {
    feed.getByName(req, res);
}

function create(req, res) {
    feed.create(req, res);
}


module.exports = {
    create
}