import { Resend } from 'resend';
import { log } from "byarutils";
import { env } from "@/env";

const resend = new Resend(env.RESEND_KEY);

export async function send(to: string, subject: string, html: string) {
    const send = await resend.emails.send({
        from: 'Newslater by Dawn. <no-reply@newslater.vanhovev.com>', to: to, subject: subject, html: html,
    });

    if (!send.error) {
        log("SUCCESS", "Mailer", `Mail sent to ${ to }`);
    } else {
        log("ERROR", "Mailer", `Failed to send mail to ${ to }.`);
    }

    return send;
}