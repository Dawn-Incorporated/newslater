const Cron = require('node-cron');
const Users = require ('./user-retriever');
const {log} = require("./system/logger");

Cron.schedule('0 6 * * *', async () => {
    Users.sendToUsers()
        .then(() => log("INFO", "Sent to all users successfully."))
        .catch((error) => log("ERROR", "Failed to send to users: " + error));
}, {
    timezone: 'Europe/Paris'
});

module.exports = {
}