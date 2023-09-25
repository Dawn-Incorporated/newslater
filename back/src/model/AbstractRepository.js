const database = require("../config/database");
const {log} = require("byarutils/lib/logger");

class AbstractRepository {

    async create(req, res) {
        try {

            // await.database.execute(...)

            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Create successful.")

        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Create failed.")
            res.status(500).send("Internal Server Error");
        }
    }

    async getAll(req, res) {
        try {
            await database.execute('SELECT * FROM ' + this.getTable(), [], (results) => {
                res.json(results);
            });

            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Get all successful.")

        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Get all failed.")
            res.status(500).send("Internal Server Error");
        }
    }

    async getById(req, res) {
        try {
            await database.execute('SELECT * FROM ' + this.getTable() + ' WHERE ' + this.getPrimaryKey() + ' = ?' , [req.body.id], (results) => {
                res.json(results);
            });

            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Get by id successful.")

        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Get by id failed.")
            res.status(500).send("Internal Server Error");
        }
    }

    async update(req, res) {
        try {

            // await.database.execute(...)

            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Update successful.")

        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Update failed.")
            res.status(500).send("Internal Server Error");
        }
    }

    async delete(req, res) {
        try {
            await database.execute('DELETE FROM ' + this.getTable() + ' WHERE ' + this.getPrimaryKey() + ' = ?', [req.body.id], (results) => {
                res.json(results);
            });

            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Delete successful.")

        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Delete failed.")
            res.status(500).send("Internal Server Error");
        }
    }


    getTable() {
    }

    getPrimaryKey() {
    }

}

module.exports = AbstractRepository;