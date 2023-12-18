const multer = require('multer');
const app = require('express')();
app.use(require('cors')({credentials: true}));

const feed = require('../controller/FeedController');
const user = require('../controller/UserController');
const follow = require('../controller/FollowController');
app.post('/user/create', multer().single(), user.create)
app.post('/feed/create', multer().single(), feed.create)
app.post('/follow/create', multer().single(), follow.create)
app.get('/feed/get', feed.getByNameApi)
app.get('/user/get', user.getUsersApi)


const ApiConfig = {
    app
}

module.exports = ApiConfig;