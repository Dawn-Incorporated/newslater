const transporter = require('nodemailer').createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD
    }
});

const Logger = require('../services/system/logger');
const ErrorHandler = require('../services/system/error-handler');

function send(to, subject, html) {
    transporter.sendMail({
        from: '"Dawn." <dawn.newslater@gmail.com>',
        to: to,
        subject: subject,
        html: html,
    }, (err) => {
        if (err) {
            Logger.log("ERROR", "Failed to send mail to " + to + ". " + err);
            ErrorHandler.addToPool(send, ["to", "subject", "html"], 2);
        } else {
            Logger.log("INFO", "Mail sent to " + to);
        }
    });
}


module.exports = {
    send
}