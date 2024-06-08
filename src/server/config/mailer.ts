import { env } from "@/env";
import { log } from "byarutils";
import { ReactElement } from "react";
import { Resend } from 'resend';

const resend = new Resend(env.AUTH_RESEND_KEY);

export async function send(to: string, subject: string, html: ReactElement) {
    return await resend.emails.send({
        from: 'Newslater by Dawn. <no-reply@newslater.fr>',
        to: to,
        subject: subject,
        react: html,
    })
        .then((response) => {
            if (response.error) {
                throw new Error(JSON.stringify(response.error));
            }

            log("SUCCESS", "Mailer", `Mail sent to ${ to }`);
        })
        .catch((error) => {
            log("ERROR", "Mailer", `Failed to send mail to ${ to }. ${ error }`);
        });
}