import { log } from "byarutils";
import userController from "@/server/controller/UserController";
import { retrieveFeeds } from "@/server/services/rss-retriever";
import { filter } from "@/server/services/rss-filter";
import { html } from "@/server/services/html-generator";

export const dynamic = 'force-dynamic'

async function previewEmail(login: string) {
    try {
        // Récupération des utilisateurs
        const users = await userController.getUsers();

        const user = users.find((user: { login: string; }) => user.login === login);

        // Récupération des feeds de l'utilisateur depuis ses sources
        let userFeeds = await retrieveFeeds(user.sources);

        // Filtrage des feeds récupérés en fonction des préférences de l'utilisateur
        let userFeedsFiltered = await filter(userFeeds, user.postlimit);

        // Génération du mail pour l'utilisateur
        return html(user.firstname, userFeedsFiltered)
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