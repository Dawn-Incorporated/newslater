const {log} = require("byarutils/lib/logger");


let database = null;

function connection() {
    try {
        database = require('mysql2').createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
        })
        log("SUCCESS", "Database", "Connected.")
    } catch (error) {
        log("ERROR", "Database", "Failed to connect to server:" + error)
    }

}

function disconnect() {
    try {
        database.end();
        log("SUCCESS", "Database", "Disconnected.")
    } catch (error) {
        log("ERROR", "Database", "Failed to disconnect from server:" + error)
    }


}


async function execute(query, params) {
    try {
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
    }
}

process.on('exit', () => {
    database.end();
});

module.exports = {
    connection,
    disconnect,
    execute
}
