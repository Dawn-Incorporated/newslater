const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');
const {log} = require("../services/logger");
const req = require("express/lib/request");

class FollowRepository extends AbstractRepository {

    async create(req, res) {
        try {
            await database.execute("INSERT INTO " + this.getTable() + " (login, url) VALUES (?, ?)", [req.body.login, req.body.url]);
            log("INFO", "Follow added.")
            res.status(201).send(true)
        } catch (error) {
            log("ERROR", 'Follow failed to be created: ' + error)
            res.status(500).send("Internal Server Error");
        }
    }

    async delete(req, res) {
        try {
            await database.execute("DELETE FROM " + this.getTable() + " WHERE login = ? AND url = ?", [req.body.login, req.body.url]);
            log("INFO", 'Follow deleted');
            res.status(200).send(true);
        } catch (error) {
            log("ERROR", 'Follow failed to be deleted: ' + error);
            res.status(500).send("Internal Server Error");
        }
    }

    getTable() {
        return "follow";
    }
}

module.exports = FollowRepository;