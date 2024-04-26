const {logger} = require("byarutils");
const {send} = require("@api/config/mailer");

const userController = require('@api/controller/UserController');
const rssRetriever = require('@api/services/rss-retriever');
const rssFilter = require('@api/services/rss-filter');
const generateHTML = require('@api/services/html-generator');

async function sendMail() {
    try {
        // Récupération des utilisateurs
        const users = await userController.getUsers();
        const result: any[] = []

        for (const user of users) {
            // Récupération des feeds de l'utilisateur depuis ses sources
            let userFeeds = await rssRetriever.retrieveFeeds(user.sources);

            // Filtrage des feeds récupérés en fonction des préférences de l'utilisateur
            let userFeedsFiltered = await rssFilter.filter(userFeeds, user.postlimit);

            // Génération du mail pour l'utilisateur
            let mailBody = generateHTML.html(user.firstname, userFeedsFiltered)

            // Envoi du mail à l'utilisateur
            let mailResult = await send(user.mail, "Start your day with newslater.", mailBody);
            result.push(mailResult);
        }
        return result;
    } catch (error) {
        logger.log('ERROR', 'Main Service', 'An internal error occurred: ' + error);
        return error;
    }
}

export async function GET() {
    const cron = await sendMail();
    return new Response(JSON.stringify(cron), {status: 200})
}

export const dynamic = "force-dynamic";