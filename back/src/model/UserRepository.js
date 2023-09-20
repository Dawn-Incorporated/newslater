const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');
const {log} = require("../services/logger");
class UserRepository extends AbstractRepository {


    async create(req, res) {
        try {
            await database.execute("INSERT INTO " + this.getTable() + " (login, password, lastname, firstname, mail, sendtime) VALUES (?, ?, ?, ?, ?, ?)", [req.body.login, req.body.password, req.body.lastname, req.body.firstname, req.body.mail, req.body.sendtime ?? '06:00:00']);
            log("INFO", "User added.")
            res.status(201).send(true)
        } catch (error) {
            log("ERROR", error)
            res.status(500).send("Internal Server Error");
        }
    }

    async update(req, res) {
        try {
            await database.execute("UPDATE " + this.getTable() + " SET password = ?, lastname = ?, firstname = ?, mail = ?, feeds = ?", [req.body.password, req.body.lastname, req.body.firstname, req.body.mail, req.body.feed]);
            log("INFO", "User updated.")
            res.status(201).send(true);
        } catch (error) {
            log("ERROR", error);
            res.status(500).send("Internal Server Error");
        }
    }

    async delete(req, res) {
        try {
            await database.execute("DELETE FROM " + this.getTable() + " WHERE login = ?", [req.body.login]);
            log("INFO", 'User deleted');
            res.status(200).send(true);
        } catch (error) {
            log("ERROR", error);
            res.status(500).send("Internal Server Error");
        }
    }

    // Custom queries

    async getFeedsApi(req, res) {
        try {
            const result = await database.execute("SELECT * FROM feeds NATURAL JOIN follow WHERE login = ?", [req.query.login]);
            log("INFO", 'User get');
            res.status(200).send(result);
        } catch (error) {
            log("ERROR", error);
            res.status(500).send("Internal Server Error");
        }
    }


    async getFeeds(login) {
        return await database.execute("SELECT * FROM feed NATURAL JOIN follow WHERE login = ?", [login]);
    }

    getTable() {
        return "users";
    }

    getPrimaryKey() {
        return "login";
    }
}

module.exports = UserRepository