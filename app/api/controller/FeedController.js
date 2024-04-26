"use server"

const FeedRepository = require('@api/model/FeedRepository');
const feed = new FeedRepository();

function getByNameApi(req, res) {
    feed.getByNameApi(req, res);
}

function create(req, res) {
    feed.create(req, res);
}


module.exports = {
    create,
    getByNameApi
}