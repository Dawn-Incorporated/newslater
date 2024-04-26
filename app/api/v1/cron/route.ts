const {logger} = require("byarutils");
const {send} = require("@api/config/mailer");

const userController = require('@api/controller/UserController');
const rssRetriever = require('@api/services/rss-retriever');
const rssFilter = require('@api/services/rss-filter');
const generateHTML = require('@api/services/html-generator');

type userType = {
    id: number,
    firstname: string,
    lastname: string,
    mail: string,
    sources: string,
    postlimit: number

}

async function sendMail() {
    try {
        // Récupération des utilisateurs
        const users = await userController.getUsers();

        users.map(async (user: userType) => {
            // Récupération des feeds de l'utilisateur depuis ses sources
            let userFeeds = await rssRetriever.retrieveFeeds(user.sources);

            // Filtrage des feeds récupérés en fonction des préférences de l'utilisateur
            let userFeedsFiltered = await rssFilter.filter(userFeeds, user.postlimit);

            // Génération du mail pour l'utilisateur
            let mailBody = generateHTML.html(user.firstname, userFeedsFiltered)

            // Envoi du mail à l'utilisateur
            await send(user.mail, "Start your day with newslater.", mailBody);
        });
        return 'Mails sent successfully.';
    } catch (error) {
        logger.log('ERROR', 'Main Service', 'An internal error occurred: ' + error);
        return 'An internal error occurred.';
    }
}

export async function GET() {
    const cron = await sendMail();
    return new Response(cron, {status: 200})
}

export const dynamic = "force-dynamic";