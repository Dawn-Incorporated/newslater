const Cron = require('node-cron');
const Users = require('./user-retriever');
const {log} = require("byarutils/lib/logger");
const {addToPool} = require("byarutils/lib/error-handler");
const {connection, disconnect} = require("../config/database");


Cron.schedule('0 6 * * *', async () => {
    connection();
    const job = () => {
        Users.sendToUsers()
            .then(() => log("SUCCESS", "Cron", "Sent to all users successfully."))
            .catch((error) => {
                log("ERROR", "Cron", "Failed to send to users: " + error);
                addToPool(job, [], 5);
            });
    }

    job();
    disconnect();
}, {
    timezone: 'Europe/Paris'
});

async function start() {
    job();
}

async function job() {
    connection();
    Users.sendToUsers()
        .then(() => log("SUCCESS", "Cron", "Sent to all users successfully."))
        .catch((error) => {
            log("ERROR", "Cron", "Failed to send to users: " + error);
            addToPool(job, [], 5);
        });
    disconnect();
}

//start()

module.exports = {}