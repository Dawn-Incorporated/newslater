import { auth } from "@/auth";
import { getUsersWithFeeds } from "@/server/db/action/usersActions";
import MailHTML from "@/server/services/html-generator";
import { filter } from "@/server/services/rss-filter";
import { retrieveFeeds } from "@/server/services/rss-retriever";
import { log } from "byarutils";

async function previewEmail(login: string) {
    const users = await getUsersWithFeeds() as any[]

    const user = users.find((user: { user_id: string; }) => user.user_id === login);

    if (!user) {
        throw new Error('User not found.');
    }

    let userFeeds = await retrieveFeeds(user.sources);

    let userFeedsFiltered = await filter(userFeeds, user.postlimit);

    return MailHTML(user.firstname, userFeedsFiltered);
}

export const GET = auth(async function GET(request) {
    if (!request.auth || !request.auth.user?.id) {
        return new Response('Unauthorized', {status: 401})
    }

    try {
        const preview = await previewEmail(request.auth.user?.id);
        // @ts-ignore todo: fix this
        return new Response(preview, {status: 200, headers: {'Content-Type': 'text/html'}});
    } catch (error) {
        log('ERROR', 'API — Preview Mail', 'An internal error occurred: ' + error);
        return new Response('An internal error occurred.', {status: 500});
    }
})
