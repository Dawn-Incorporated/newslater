"use server"

const transporter = require('nodemailer').createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD
    }
});

const {log} = require("byarutils");

async function send(to, subject, html) {
    transporter.sendMail({
        from: '"Dawn." <dawn.newslater@gmail.com>',
        to: to,
        subject: subject,
        html: html,
    }, (err) => {
        if (err) {
            log("ERROR", "Mailer", "Failed to send mail to " + to + ". " + err);
        } else {
            log("SUCCESS", "Mailer", "Mail sent to " + to);
        }
    });
}

module.exports = {
    send
}