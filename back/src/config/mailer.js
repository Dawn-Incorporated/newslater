const transporter = require('nodemailer').createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD
    }
});

function send(to, subject, html) {
    transporter.sendMail({
        from: '"Dawn." <dawn.newslater@gmail.com>',
        to: to,
        subject: subject,
        html: html,
    });
}


module.exports = {
    send
}


