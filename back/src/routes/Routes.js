const cors = require('cors');
const multer = require('multer');
const express = require('express');
const app = express();
app.use(cors({credentials: true}));

const feed = require('../controller/FeedController');
const user = require('../controller/UserController');

app.get('/feeds', feed.retrieveFeed)
app.post('/', multer().single(), feed.create)

const ApiConfig = {
    app
}

module.exports = ApiConfig;