const cors = require('cors');
const multer = require('multer');
const express = require('express');
const app = express();
app.use(cors({credentials: true}));

//app.get('/', function)
//app.post('/', multer().single(), function)

// Lancement du serveur
const ApiConfig = {
    app
}

module.exports = ApiConfig;