require('dotenv').config({path: './src/config/.env'});
const config = require('./src/routes/Routes');

// Lancement du serveur
config.app.listen(4000, () => {
    console.log('API server is running');
});
