const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');
const {log} = require("../services/system/logger");
class UserRepository extends AbstractRepository {


    async create(req, res) {
        try {
            await database.execute("INSERT INTO " + this.getTable() + " (login, password, lastname, firstname, mail, sendtime) VALUES (?, ?, ?, ?, ?, ?)", [req.body.login, req.body.password, req.body.lastname, req.body.firstname, req.body.mail, req.body.sendtime ?? '06:00:00']);
            log("INFO", "User added.")
            res.status(201).send(true)
        } catch (error) {
            log("ERROR", 'Users failed to be created: ' + error)
            res.status(500).send("Internal Server Error");
        }
    }

    async update(req, res) {
        try {
            await database.execute("UPDATE " + this.getTable() + " SET password = ?, lastname = ?, firstname = ?, mail = ?, feeds = ?", [req.body.password, req.body.lastname, req.body.firstname, req.body.mail, req.body.feed]);
            log("INFO", "User updated.")
            res.status(201).send(true);
        } catch (error) {
            log("ERROR", 'Users failed to be updated: ' + error);
            res.status(500).send("Internal Server Error");
        }
    }

    async delete(req, res) {
        try {
            await database.execute("DELETE FROM " + this.getTable() + " WHERE login = ?", [req.body.login]);
            log("INFO", 'User deleted');
            res.status(200).send(true);
        } catch (error) {
            log("ERROR", 'User failed to be deleted: ' + error);
            res.status(500).send("Internal Server Error");
        }
    }

    // Custom queries

    async getUsersApi(req, res) {
        try {
            const result = await database.execute("SELECT fo.login, u.lastname, u.firstname, u.mail, GROUP_CONCAT(fo.url SEPARATOR ', ') AS feeds, u.sendtime, u.postlimit FROM follow fo NATURAL JOIN feeds fe NATURAL JOIN users u GROUP BY fo.login, u.lastname, u.firstname, u.sendtime", []);
            log("INFO", 'Users retrieved from the API.');
            res.status(200).send(result);
        } catch (error) {
            log("ERROR", 'Users failed to be retrieved from the API: ' + error);
            res.status(500).send("Internal Server Error");
        }
    }


    async getUsers() {
        try {
            const result = await database.execute("SELECT fo.login, u.lastname, u.firstname, u.mail, GROUP_CONCAT(fo.url SEPARATOR ', ') AS feeds, u.sendtime, u.postlimit FROM follow fo NATURAL JOIN feeds fe NATURAL JOIN users u GROUP BY fo.login, u.lastname, u.firstname, u.sendtime", []);
            log("INFO", "Users retrieved internally.")

            return result.map((user) => {
                user.feeds = user.feeds.split(', ');
                return user;
            });

        } catch (error) {
            log("ERROR", 'Users failed to be retrieved internally: ' + error);
            return [];
        }
    }

    getTable() {
        return "users";
    }

    getPrimaryKey() {
        return "login";
    }
}

module.exports = UserRepository