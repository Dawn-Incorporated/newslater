require('dotenv').config({path: './src/config/.env'});
require('./src/services/cron');

require('./src/routes/Routes').app.listen(4000, () => {
    console.log('API server is running');
});