const Cron = require('node-cron');
const Rss = require('./rss-retriever');
const Sender = require('./sender');

Cron.schedule('* * * * *', async () => {
    console.log("sending. ");
    const feeds = await Rss.retrieveFeeds(['https://9to5mac.com/feed']);
    Sender.process(feeds);
    console.log("sent. " + new Date())
}, {
    timezone: 'Europe/Paris'
});


module.exports = {
}