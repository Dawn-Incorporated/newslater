const transporter = require('nodemailer').createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD
    }
});

const {log} = require("byarutils/lib/logger");
const {addToPool} = require("byarutils/lib/error-handler");

async function send(to, subject, html) {
    transporter.sendMail({
        from: '"Dawn." <dawn.newslater@gmail.com>',
        to: to,
        subject: subject,
        html: html,
    }, (err) => {
        if (err) {
            log("ERROR", "Mailer", "Failed to send mail to " + to + ". " + err);
            //addToPool(send, [to, subject, html], 3);
        } else {
            log("SUCCESS", "Mailer", "Mail sent to " + to);
        }
    });
}

module.exports = {
    send
}