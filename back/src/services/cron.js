const Cron = require('node-cron');

const Rss = require('./rss-retriever');

const Sender = require('./sender');

Cron.schedule('* * * * *', async () => {
    console.log("sending. ");
    const publication = await Rss.retrieveFeed('https://9to5mac.com/feed');
    Sender.process(publication);
    console.log("sent. " + new Date());
}, {
    timezone: 'Europe/Paris'
});


module.exports = {
}