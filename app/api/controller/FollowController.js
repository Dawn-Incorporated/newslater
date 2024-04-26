"use server"

const FollowRepository = require('../model/FollowRepository');
const follow = new FollowRepository();

function create(req, res) {
    follow.create(req, res)
}

module.exports = {
    create
}