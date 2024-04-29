"use server"

const FeedRepository = require('@api/model/FeedRepository');
const feed = new FeedRepository();

function create(req, res) {
    feed.create(req, res);
}
function getAll() {
    return feed.getAll();
}

function getByNameApi(req, res) {
    feed.getByNameApi(req, res);
}

module.exports = {
    create,
    getAll,
    getByNameApi
}