function process(publications) {
    require('../config/mailer').send("dawn.newslater@gmail.com", "Nouvelles publications", require('./html-generator').html(publications));
}

module.exports = {
    process
}