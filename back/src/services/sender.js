function process(publications, length = -1) {

    const body = require('./html-generator').html(publications, length);

    require('../config/mailer').send("dawn.newslater@gmail.com", "Nouvelles publications", body);
}

module.exports = {
    process
}