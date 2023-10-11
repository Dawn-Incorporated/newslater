const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');
const {log} = require('byarutils/lib/logger');

class FeedRepository extends AbstractRepository {

    async create(req, res) {
        try {
            await database.execute("INSERT INTO " + this.getTable() + " (url, name, description, website) VALUES (?, ?, ?, ?)", [req.body.url, req.body.name, req.body.description, req.body.website]);
            log("SUCCESS", "FeedRepository", "Feed added.")
            res.status(200).send(true)
        } catch (error) {
            log("ERROR", 'Feed failed to be created: ' + error)
            res.status(500).send("Internal Server Error");
        }
    }

    async update(req, res) {
        try {
            await database.execute("UPDATE " + this.getTable() + " SET name = ? AND description = ? AND website = ? WHERE url = ?", [req.body.name, req.body.description, req.body.website, req.body.url]);
            log("SUCCESS", "FeedRepository", "Feed updated.")
            res.status(200).send();
        } catch (error) {
            log("ERROR", "FeedRepository", 'Feed failed to be updated: ' + error)
            res.status(500).send("Internal Server Error");
        }
    }

    getTable() {
        return "feeds";
    }

    getPrimaryKey() {
        return "url";
    }

    // Custom queries

    async getByName(req, res) {
        try {
            const results = await database.execute('SELECT * FROM ' + this.getTable() + ' WHERE name LIKE ?', [req.query.name + '%']);
            log("SUCCESS", "FeedRepository", "Feed retrieved");
            res.status(200).json(results);
        } catch (error) {
            log("ERROR", "FeedRepository", 'Feed (getByName) failed to be retrieved: ' + error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = FeedRepository;