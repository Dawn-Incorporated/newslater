import { Empty } from "@/components/app/general/empty";
import { DataTable } from "@/components/data/data-table";
import { columnsFeed } from "@/columns/columns-feed";
import { getFeed } from "@/server/db/action/feedsActions";
import { FeedType } from "@/server/db/types";

export async function FeedsTable() {
    const data = await getFeed();

    const feeds = data.map((feed: FeedType) => {
        return {
            ...feed,
            verified: feed.date_verified ? "Y" : "N"
        }
    })

    if (!feeds || feeds.length === 0) {
        return <Empty
            title="Aucun contrat"
            description="Aucun contrat n'a été trouvé pour ce projet."
        />
    }

    return <DataTable columns={columnsFeed} data={feeds}/>
}