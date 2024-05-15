"use server"

import { log } from "byarutils";
import pg from 'pg'
const { Client } = pg

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

let database = null;
let connectionTimer = null;

async function connection() {
    if (database) {
        log("SUCCESS", "Database", "Already connected.")
        return;
    }
    try {
        database = new Client({
            host: PGHOST, port: 5432,  database: PGDATABASE, user: PGUSER, password: PGPASSWORD, ssl: false
        })
        await database.connect();
        log("SUCCESS", "Database", "Connected.")
        autoDisconnect();
    } catch (error) {
        log("ERROR", "Database", "Failed to connect to server: " + error)
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
        const result = await database.query(query, params);
        log("SUCCESS", "Database", `Query "${query}"`);
        return result;
    } catch (error) {
        log("ERROR", "Database", `Failed to execute query "${query}". ${error}`);
        autoDisconnect();
    }
}




process.on('exit', () => {
    database.end();
});

module.exports = {
    execute
}
