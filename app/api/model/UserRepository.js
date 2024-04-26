"use server"

import AbstractRepository from './AbstractRepository';
import database from '../config/database';
import {log} from "byarutils";

class UserRepository extends AbstractRepository {


    async create(login, password, lastname, firstname, mail, sendtime) {
        try {
            const result = await database.execute(`INSERT INTO ${this.getTable()} (login, password, lastname, firstname, mail, sendtime) VALUES (?, ?, ?, ?, ?, ?)`, [login, password, lastname, firstname,mail, sendtime ?? '06:00:00']);
            log("SUCCESS", "UserRepository", "User added.")
            return result.rows
        } catch (error) {
            log("ERROR","UserRepository",'Users failed to be created: ' + error)
            return false;
        }
    }

    async update(password, lastname, firstname, mail, feed) {
        try {
            const result = await database.execute(`UPDATE ${this.getTable()} SET password = ?, lastname = ?, firstname = ?, mail = ?, feeds = ?`, [password, lastname, firstname, mail, feed]);
            log("SUCCESS", "UserRepository", "User updated.")
            return result.rows
        } catch (error) {
            log("ERROR", "UserRepository", 'Users failed to be updated: ' + error);
            return false
        }
    }

    async delete() {
        try {
            const result = await database.execute(`DELETE FROM ${this.getTable()} WHERE login = ?`, [req.body.login]);
            log("SUCCESS", "UserRepository", 'User deleted');
            return result.rows
        } catch (error) {
            log("ERROR", "UserRepository", 'User failed to be deleted: ' + error);
            return false
        }
    }

    // Custom queries

    async getUsersApi() {
        try {
            const result = await database.execute("SELECT fo.login, u.lastname, u.firstname, u.mail, STRING_AGG(fo.url, ', ') AS sources, u.sendtime, u.postlimit FROM follow fo JOIN feeds fe ON fo.url = fe.url JOIN users u ON fo.login = u.login GROUP BY fo.login, u.lastname, u.firstname, u.mail, u.sendtime, u.postlimit", []);
            log("SUCCESS", "UserRepository", 'Users retrieved from the API.');
            return result.rows
        } catch (error) {
            log("ERROR", "UserRepository", 'Users failed to be retrieved from the API: ' + error);
            return "Internal Server Error";
        }
    }


    async getUsers() {
        try {
            const result = await database.execute("SELECT fo.login, u.lastname, u.firstname, u.mail, STRING_AGG(fo.url, ', ') AS sources, u.sendtime, u.postlimit FROM follow fo JOIN feeds fe ON fo.url = fe.url JOIN users u ON fo.login = u.login GROUP BY fo.login, u.lastname, u.firstname, u.mail, u.sendtime, u.postlimit", []);
            log("SUCCESS", "UserRepository", "Users retrieved internally.")

           return result.rows.map((user) => {
                user.sources = user.sources.split(', ');
                return user;
            });

        } catch (error) {
            log("ERROR", "UserRepository", 'Users failed to be retrieved internally: ' + error);
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