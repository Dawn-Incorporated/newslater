const Mailer = require('../config/mailer');

const Generator = require('./html-generator');

function process(publications) {
    Mailer.send("matis.byar.06@icloud.com", "Nouvelles publications", Generator.html(publications));
}



module.exports = {
    process
}