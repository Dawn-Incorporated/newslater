import { auth } from "@/auth";
import { getUsersWithFeeds } from "@/server/db/action/usersActions";
import MailHTML from "@/server/services/html-generator";
import { filter } from "@/server/services/rss-filter";
import { retrieveFeeds } from "@/server/services/rss-retriever";
import { log } from "byarutils";

export const dynamic = 'force-dynamic'

async function previewEmail(login: string) {
    try {
        const users = await getUsersWithFeeds() as any[]

        const user = users.find((user: { user_id: string; }) => user.user_id === login);

        let userFeeds = await retrieveFeeds(user.sources);

        let userFeedsFiltered = await filter(userFeeds, user.postlimit);

        return MailHTML(user.firstname, userFeedsFiltered);
    } catch (error) {
        log('ERROR', 'Main Service', 'An internal error occurred: ' + error);
        return (
            <>
                <h1 className="text-2xl font-bold">No feed found!</h1>
                <p className="text-muted-foreground">Try again later.</p>
            </>
        );
    }
}

export const MailPreview = async () => {
    const session = await auth()

    if (!session || !session.user?.id) {
        return null;
    }

    return await previewEmail(session.user?.id)
}