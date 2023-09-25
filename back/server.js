require('dotenv').config({path: './src/config/.env'});
require('./src/services/cron');
const {log} = require("byarutils/lib/logger");


require('./src/routes/Routes').app.listen(4000, () => {
    log("INFO", "Server", "Server is running.")
});