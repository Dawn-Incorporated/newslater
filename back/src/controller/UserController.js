const UserController = require('../model/UserRepository')
const user = new UserController();

function getById(req, res) {
    user.getById(req, res);
}

function create(req, res) {
    user.create(req, res)
}

function getFeedsApi(req, res) {
    user.getFeedsApi(req, res)
}

function getFeeds() {
    return user.getFeeds()
}

module.exports = {
    getById,
    create,
    getFeedsApi,
    getFeeds
}