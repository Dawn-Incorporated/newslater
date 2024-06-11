import { columnsFeed } from "@/columns/columns-feed";
import { DataTable } from "@/components/data/data-table";
import { getFeedsByUser } from "@/server/db/action/usersActions";

export async function AuthenticatedAccountPage({email}: { email: string | null | undefined }) {
    let feeds: any = email ? await getFeedsByUser(email) : []

    return (
        <>
            <DataTable columns={ columnsFeed } data={ feeds }/>
        </>
    )
}