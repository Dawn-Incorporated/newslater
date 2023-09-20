function process(user, length = -1) {
    const mail = user.mail;

    const body = require('./html-generator').html(user, length);

    require('../config/mailer').send(mail, "Nouvelles publications", body);
}

module.exports = {
    process
}