const AbstractRepository = require('./AbstractRepository');
const database = require('../config/database');

class FeedRepository extends AbstractRepository {

    create(req, res) {
        database.execute("INSERT INTO " + this.getTable() + " (url, name, description, website) VALUES (?, ?, ?, ?)", [req.body.url, req.body.name, req.body.description, req.body.website], () => {
            res.status(201);
        });
    }

    update(req, res) {
        database.execute("UPDATE " + this.getTable() + " SET name = ? AND description = ? AND website = ? WHERE url = ?", [req.body.name, req.body.description, req.body.website, req.body.url], (results) => {
            res.json(results);
        })
    }

    getTable() {
        return "feeds";
    }

    getPrimaryKey() {
        return "url";
    }

    // Custom queries

    getByName(req, res) {
        database.execute('SELECT * FROM ' + this.getTable() + ' WHERE ' + this.getPrimaryKey() + ' = ' + req.body.id, [], (results) => {
            res.json(results);
        });
    }
}

module.exports = FeedRepository;