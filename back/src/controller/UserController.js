const UserController = require('../model/UserRepository')
const user = new UserController();

function getById(req, res) {
    user.getById(req, res);
}

function create(req, res) {
    user.create(req, res)
}

function getUsersApi(req, res) {
    user.getUsersApi(req, res)
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