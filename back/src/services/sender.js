function process(user, length = -1) {
    const body = require('./html-generator').html(user, length);

    require('../config/mailer').send(user.mail, "Nouvelles publications", body);
}

module.exports = {
    process
}