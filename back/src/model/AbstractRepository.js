const database = require("../config/database");

class AbstractRepository {

    create(req, res) {
    }

    getAll(req, res) {
        database.execute('SELECT * FROM ' + this.getTable(), [], (results) => {
            res.json(results);
        });
    }

    getById(req, res) {
        database.execute('SELECT * FROM ' + this.getTable() + ' WHERE ' + this.getPrimaryKey() + ' = ?' , [req.body.id], (results) => {
            res.json(results);
        });
    }

    update(req, res) {
    }

    delete(req, res) {
        database.execute('DELETE FROM ' + this.getTable() + ' WHERE ' + this.getPrimaryKey() + ' = ?', [req.body.id], (results) => {
            res.json(results);
        });
    }


    getTable() {
    }

    getPrimaryKey() {
    }

}

module.exports = AbstractRepository;