"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

const {log} = require("byarutils");

async function send(to, subject, html) {
    const send = await resend.emails.send({
        from: 'Newslater by Dawn. <noreplay@newslater.vanhovev.com>', to: ['vanhove.valentin@gmail.com'], subject: subject, html: html,
    });

    if (!send.error) {
        log("SUCCESS", "Mailer", "Mail sent to " + to);
    } else {
        log("ERROR", "Mailer", "Failed to send mail to " + to + ". ");
    }

    return send;
}

module.exports = {
    send
}