const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');

class UserRepository extends AbstractRepository {


    create(req, res) {
        database.execute("INSERT INTO " + this.getTable() + "(login, password, lastname, firstname, mail, feeds) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.login, req.body.password, req.body.lastname, req.body.firstname, req.body.mail, req.body.feed], () => {
            res.status(201);
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

    getTable() {
        return "users";
    }

    getPrimaryKey() {
        return "login";
    }
}

module.exports = UserRepository