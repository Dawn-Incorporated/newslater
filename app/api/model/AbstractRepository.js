"use server"

const database = require("../config/database");
const {log} = require("byarutils");

class AbstractRepository {

    async create() {
        try {

            // await.database.execute(...)

            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Create successful.")

        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Create failed.")
            return false;
        }
    }

    async getAll() {
        try {
            const result = await database.execute(`SELECT * FROM ${this.getTable()}`, []);
            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Get all successful.")
            return result.rows;
        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Get all failed.")
            return false;
        }
    }

    async getById(id) {
        try {
            const result = await database.execute(`SELECT * FROM ${this.getTable()} WHERE ${this.getPrimaryKey()} = ?` , [id])
            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Get by id successful.")
            return result.rows;
        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Get by id failed.")
            return false;
        }
    }

    async update() {
        try {

            // await.database.execute(...)

            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Update successful.")

        } catch (error) {
            log("ERROR", "AbstractRepository (" + this.getTable() + ")", "Update failed.")
            return false
        }
    }

    async delete(id) {
        try {
            const result = await database.execute(`DELETE FROM ${this.getTable()} WHERE ${this.getPrimaryKey()} = ?`, [id])
            log("SUCCESS", "AbstractRepository (" + this.getTable() + ")", "Delete successful.")
            return result.rows;
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