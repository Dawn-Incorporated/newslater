const UserStub = require('../model/stub/UserStub');
const UserDB = require('../controller/UserController')
const Rss = require("./rss-retriever");
const Sender = require("./sender");
const {log} = require("byarutils/lib/logger");

async function sendToUsers() {
    const users = await UserDB.getUsers();

    log("INFO", "User Retriever", "Users retrieved, starting processing.");

    users.map(async (user) => {
        user.sources = await Rss.retrieveFeeds(user.feeds);
        Sender.process(user);
    });
}

module.exports = {
    sendToUsers
}