import { auth } from "@/auth";
import { getUsersWithFeeds } from "@/server/db/action/usersActions";
import MailHTML from "@/server/services/html-generator";
import { filter } from "@/server/services/rss-filter";
import { retrieveFeeds } from "@/server/services/rss-retriever";
import { log } from "byarutils";
import { NextAuthRequest } from "next-auth/lib";
import { loadWebpackHook } from "next/dist/server/config-utils";

export const dynamic = 'force-dynamic'

async function previewEmail(login: string) {
    try {
        // Récupération des utilisateurs
        const users = await getUsersWithFeeds() as any[]

        const user = users.find((user: { user_id: string; }) => user.user_id === login);

        if (!user) {
            return 'No feed found';
        }

        // Récupération des feeds de l'utilisateur depuis ses sources
        let userFeeds = await retrieveFeeds(user.sources);

        // Filtrage des feeds récupérés en fonction des préférences de l'utilisateur
        let userFeedsFiltered = await filter(userFeeds, user.postlimit);

        // Génération du mail pour l'utilisateur
        return MailHTML(user.firstname, userFeedsFiltered);
    } catch (error) {
        log('ERROR', 'Main Service', 'An internal error occurred: ' + error);
        return 'An internal error occurred.';
    }
}

export const GET = auth(async function GET(request: NextAuthRequest) {
    if (!request.auth) {
        return new Response('Unauthorized', {status: 401})
    }

    const login = request.auth.user?.id;
    if (login) {
        const preview = await previewEmail(login);
        return new Response(preview, {status: 200, headers: {'Content-Type': 'text/html'}});
        //return new Response('Preview is disabled', {status: 400});
    }
    return new Response('Please provide a login or invalid login', {status: 400});
})