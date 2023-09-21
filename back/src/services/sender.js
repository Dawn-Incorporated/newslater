function process(user) {
    const body = require('./html-generator').html(user);

    require('../config/mailer').send(user.mail, "Nouvelles publications", body);
}

module.exports = {
    process
}