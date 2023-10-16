const {log} = require("byarutils/lib/logger");


let database = null;
let connectionTimer = null;

function connection() {
    if (database) {
        log("SUCCESS", "Database", "Already connected.")
        return;
    }
    try {
        database = require('mysql2').createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
        })
        log("SUCCESS", "Database", "Connected.")
        autoDisconnect();
    } catch (error) {
        log("ERROR", "Database", "Failed to connect to server:" + error)
    }
}

function autoDisconnect() {
    if (connectionTimer) {
        clearTimeout(connectionTimer);
        log("SUCCESS", "Database", "Timer cleared.")
    }
    connectionTimer = setTimeout(() => {
        try {
            database.end();
            database = null;
            log("SUCCESS", "Database", "Disconnection after 30 minutes of inactivity.")
        } catch (error) {
            log("ERROR", "Database", "Failed to disconnect from server:" + error)
        }
    }, 1800000); // 30 minutes
}

async function execute(query, params) {
    connection();
    try {
        autoDisconnect();
        return new Promise((resolve, reject) => {
            database.query(query, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    } catch (error) {
        log("ERROR", "Database", "Failed to execute query " + query + " with params " + params + ". " + error);
        autoDisconnect();
    }
}

process.on('exit', () => {
    database.end();
});

module.exports = {
    execute
}
