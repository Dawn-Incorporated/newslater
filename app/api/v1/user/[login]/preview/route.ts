"use server"

const {log} = require("byarutils");

const userController = require('@api/controller/UserController');
const rssRetriever = require('@api/services/rss-retriever');
const rssFilter = require('@api/services/rss-filter');
const generateHTML = require('@api/services/html-generator');

async function previewEmail(login: string) {
    try {
        // Récupération des utilisateurs
        const users = await userController.getUsers();

        const user = users.find((user: { login: string; }) => user.login === login);

        // Récupération des feeds de l'utilisateur depuis ses sources
        let userFeeds = await rssRetriever.retrieveFeeds(user.sources);

        // Filtrage des feeds récupérés en fonction des préférences de l'utilisateur
        let userFeedsFiltered = await rssFilter.filter(userFeeds, user.postlimit);

        // Génération du mail pour l'utilisateur
        return generateHTML.html(user.firstname, userFeedsFiltered)
    } catch (error) {
        log('ERROR', 'Main Service', 'An internal error occurred: ' + error);
        return 'An internal error occurred.';
    }
}

export async function GET(request: Request, {params}: { params: { login: string } }) {
    const preview = await previewEmail(params.login);
    return new Response(preview, {status: 200, headers: {'Content-Type': 'text/html'}});
}