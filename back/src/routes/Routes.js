const multer = require('multer');
const app = require('express')();
app.use(require('cors')({credentials: true}));

const feed = require('../controller/FeedController');
const user = require('../controller/UserController');
//const rss = require('../services/rss-retriever')

app.post('/user/create', multer().single(), user.create)
app.post('/feed/create', multer().single(), feed.create)

app.get('/', user.getUsersApi)


const ApiConfig = {
    app
}

module.exports = ApiConfig;