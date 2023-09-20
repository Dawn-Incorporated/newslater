const multer = require('multer');
const app = require('express')();
app.use(require('cors')({credentials: true}));

//const feed = require('../controller/FeedController');
//const user = require('../controller/UserController');
//const rss = require('../services/rss-retriever')

//app.post('/', multer().single(), feed.create)

app.get('/', (res) => {
    res.send('Hello World!');
})

const ApiConfig = {
    app
}

module.exports = ApiConfig;