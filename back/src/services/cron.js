const Cron = require('node-cron');
const Rss = require('./rss-retriever');
const Sender = require('./sender');
const Users = require ('./user-retriever');

/*Cron.schedule('* * * * *', async () => {
    console.log("sending. ");
    const feeds = await Rss.retrieveFeeds(['https://9to5mac.com/feed']);
    Sender.process(feeds);
    console.log("sent. " + new Date())
}, {
    timezone: 'Europe/Paris'
});
 */

async function start() {
    console.log("sending. ");
    /*const feeds = await Rss.retrieveFeeds(['https://9to5mac.com/feed', 'https://apple.com/newsroom/rss-feed.rss', 'https://feeds.macrumors.com/MacRumors-Front']);
    Sender.process(feeds, "dawn.newslater@gmail.com", 10);*/

    Users.sendToUsers();

    console.log("sent. " + new Date())
}


start();

module.exports = {
}