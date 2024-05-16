import {html} from "@/server/services/html-generator";
import { retrieveFeeds } from "@/server/services/rss-retriever";
import { send } from "@/server/config/mailer";
import { filter } from "@/server/services/rss-filter";
import { log } from "byarutils";
import { getUsersWithFeeds } from "@/server/db/action/usersActions";

export const dynamic = 'force-dynamic'

async function sendMail() {
    try {
        // Récupération des utilisateurs
        const users = await getUsersWithFeeds() as any[];
        const result: any[] = []

        for (const user of users) {
            // Récupération des feeds de l'utilisateur depuis ses sources
            let userFeeds = await retrieveFeeds(user.sources);

            // Filtrage des feeds récupérés en fonction des préférences de l'utilisateur
            let userFeedsFiltered = await filter(userFeeds, user.postlimit);

            // Génération du mail pour l'utilisateur
            let mailBody = html(user.firstname, userFeedsFiltered)

            // Envoi du mail à l'utilisateur
            let mailResult = await send(user.mail, "Start your day with newslater.", mailBody);
            result.push(mailResult);
        }
        return result;
    } catch (error) {
        log('ERROR', 'Main Service', 'An internal error occurred: ' + error);
        return error;
    }
}

export async function GET() {
    const cron = await sendMail();
    return new Response(JSON.stringify(cron), {status: 200})
}