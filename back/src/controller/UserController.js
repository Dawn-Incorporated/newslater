const UserController = require('../model/UserRepository')
const user = new UserController();

function getById(req, res) {
    user.getById(req, res);
}