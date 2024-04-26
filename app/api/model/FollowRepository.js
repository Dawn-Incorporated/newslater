"use server"

const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');
const {log} = require("byarutils");

class FollowRepository extends AbstractRepository {

    async create() {
        try {
            const result = await database.execute(`INSERT INTO ${this.getTable()} (login, url) VALUES (?, ?)`, [login, url]);
            log("SUCCESS", "FollowRepository", "Follow added.")
            return result.rows
        } catch (error) {
            log("ERROR", "FollowRepository", 'Follow failed to be created: ' + error)
            return false
        }
    }

    async delete(login, url) {
        try {
            const result = await database.execute(`DELETE FROM ${this.getTable()} WHERE login = ? AND url = ?`, [login, url]);
            log("SUCCESS", "FollowRepository",  'Follow deleted');
            return result.rows
        } catch (error) {
            log("ERROR", "FollowRepository", 'Follow failed to be deleted: ' + error);
            return false
        }
    }

    getTable() {
        return "follow";
    }
}

module.exports = FollowRepository;