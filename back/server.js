require('dotenv').config({path: './src/config/.env'});
const config = require('./src/routes/Routes');
require('./src/services/cron');

config.app.listen(4000, () => {
    console.log('API server is running');
});