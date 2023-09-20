const transporter = require('nodemailer').createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD
    }
});

const Logger = require('../services/logger')

function send(to, subject, html) {
    transporter.sendMail({
        from: '"Dawn." <dawn.newslater@gmail.com>',
        to: to,
        subject: subject,
        html: html,
    }, (err, info) => {
        if (err) {
            Logger.log("ERROR", err);
        } else {
            Logger.log("INFO", "Mail sent to " + to);
        }
    });
}


module.exports = {
    send
}