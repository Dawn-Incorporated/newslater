"use server";

const {logger} = require("byarutils");
const {send} = require("./config/mailer");

const userController = require('./controller/UserController');
const rssRetriever = require('./services/rss-retriever');
const rssFilter = require('./services/rss-filter');
const generateHTML = require('./services/html-generator');

async function main() {
    try {
        // Récupération des utilisateurs
        const users = await userController.getUsers();

        users.map(async (user) => {
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

module.exports = {
    main
};

export const dynamic = "force-dynamic";