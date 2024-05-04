export const dynamic = 'force-dynamic'

const {log} = require("byarutils");

const userController = require('@api/_system/controller/UserController');
const rssRetriever = require('@api/_system/services/rss-retriever');
const rssFilter = require('@api/_system/services/rss-filter');
const generateHTML = require('@api/_system/services/html-generator');

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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const login = searchParams.get('login')
    if(login) {
        const preview = await previewEmail(login);
        return new Response(preview, {status: 200, headers: {'Content-Type': 'text/html'}});
    }
    return new Response('An internal error occurred.', {status: 500})
}