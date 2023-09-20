const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');
const {log} = require("../services/logger");

class UserRepository extends AbstractRepository {


    create(req, res) {
        database.execute("INSERT INTO " + this.getTable() + " (login, password, lastname, firstname, mail, sendtime) VALUES (?, ?, ?, ?, ?, ?)", [req.body.login, req.body.password, req.body.lastname, req.body.firstname, req.body.mail, req.body.sendtime ?? '06:00:00'], () => {
            res.status(201);
        })
            .then(() => {
                log("INFO", "User added.")
                res.status(201).send(true)
            })
            .catch((error) => {
                log("ERROR", error)
                res.status(400).send(false)
            });
    }

    update(req, res) {
        database.execute("UPDATE " + this.getTable() + " SET password = ?, lastname = ?, firstname = ?, mail = ?, feeds = ?", [req.body.password, req.body.lastname, req.body.firstname, req.body.mail, req.body.feed], () => {
            res.status(201);
        });
    }

    delete(req, res) {
        database.execute("DELETE FROM " + this.getTable() + " WHERE login = ?", [req.body.login], () => {
            res.status(201);
        });
    }

    // Custom queries

    getFeedsApi(req, res){
        database.execute("SELECT * FROM feed NATURAL JOIN follow WHERE login = ?", [req.body.login], (result) => {
            res.status(201).send(result)
        })
    }

    getFeeds(login){
        database.execute("SELECT * FROM feed NATURAL JOIN follow WHERE login = ?", [login], (result) => {
            return result;
        })
    }

    getTable() {
        return "users";
    }

    getPrimaryKey() {
        return "login";
    }
}

module.exports = UserRepository