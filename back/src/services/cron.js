const Cron = require('node-cron');

const Rss = require('./rss-retriever');

const Sender = require('./sender');

Cron.schedule('* * * * *', () => {

    Rss.retrieveFeed('https://9to5mac.com/feed')
        .then(publications => {
            Sender.process(publications);
        })

}, {
    timezone: 'Europe/Paris'
});