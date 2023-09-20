const {log} = require("../services/logger");
const connection = require('mysql2').createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
})

async function execute(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


process.on('exit', () => {
    connection.end();
});

module.exports = {
    execute
}
