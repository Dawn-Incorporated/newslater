//const UserDBStub = require('../model/stub/UserStub');
const UserDB = require('../controller/UserController')
const Rss = require("./rss-retriever");
const Sender = require("./sender");

async function sendToUsers() {
    const users = await UserDB.getFeeds()
    users.map(async (user) => {
        user.sources = await Rss.retrieveFeeds(user.feeds);
        Sender.process(user, 10);
    });
}

module.exports = {
    sendToUsers
}