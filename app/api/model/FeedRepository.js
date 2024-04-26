"use server"

const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');
const {log} = require('byarutils');

class FeedRepository extends AbstractRepository {

    async create(url, name, description, website) {
        try {
            const result = await database.execute(`INSERT INTO  ${this.getTable()} (url, name, description, website) VALUES (?, ?, ?, ?)`, [url, name, description, website]);
            log("SUCCESS", "FeedRepository", "Feed added.")
            return result.rows;
        } catch (error) {
            log("ERROR", 'Feed failed to be created: ' + error)
            return false;
        }
    }

    async update(name, description, website, url) {
        try {
            const result = await database.execute(`UPDATE ${this.getTable()} SET name = ? AND description = ? AND website = ? WHERE url = ?`, [name, description, website, url]);
            log("SUCCESS", "FeedRepository", "Feed updated.")
            return result.rows;
        } catch (error) {
            log("ERROR", "FeedRepository", 'Feed failed to be updated: ' + error)
            return false;
        }
    }

    getTable() {
        return "feeds";
    }

    getPrimaryKey() {
        return "url";
    }

    // Custom queries

    async getByNameApi() {
        try {
            const result = await database.execute(`SELECT * FROM ${this.getTable()} WHERE name LIKE ?`, [name + '%']);
            log("SUCCESS", "FeedRepository", "Feed retrieved");
            return result.rows;
        } catch (error) {
            log("ERROR", "FeedRepository", 'Feed (getByName) failed to be retrieved: ' + error);
            return false;
        }
    }
}

module.exports = FeedRepository;