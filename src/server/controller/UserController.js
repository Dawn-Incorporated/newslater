"use server"

const UserRepository = require('@api/_system/model/UserRepository');
const user = new UserRepository();

function getById(req, res) {
    user.getById(req, res);
}

function create(req, res) {
    user.create(req, res)
}

function getUsersApi() {
    return user.getUsersApi()
}

function getUsers() {
    return user.getUsers()
}

module.exports = {
    getById,
    create,
    getUsersApi,
    getUsers
}