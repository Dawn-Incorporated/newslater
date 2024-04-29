"use server"

const FollowRepository = require('@api/_system/model/FollowRepository');
const follow = new FollowRepository();

function create(req, res) {
    follow.create(req, res)
}

module.exports = {
    create
}