const UserDB = require('../model/stub/UserStub');
const Rss = require("./rss-retriever");
const Sender = require("./sender");

function sendToUsers() {
    UserDB.getAll().map(async (user) => {
        user.sources = await Rss.retrieveFeeds(user.feeds);
        Sender.process(user, 10);
    });
}

module.exports = {
    sendToUsers
}