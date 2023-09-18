const mysql = require('mysql');

const connection = mysql.createConnection({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.error('Erreur de connexion à la base de données:', error);
    } else {
        console.log('Connexion réussie à la base de données');
    }
});


function execute(query, params, callback) {
    connection.query(query, params, (error, results, fields) => {
        if (error) throw error;
        callback(results);
    });
}


process.on('exit', () => {
    connection.end();
});

module.exports = {
    execute
}
