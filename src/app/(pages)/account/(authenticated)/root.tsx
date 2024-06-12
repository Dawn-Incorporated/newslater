import { columnsFeed } from "@/columns/columns-feed";
import { DataTable } from "@/components/data/data-table";
import { getFeedsByUser } from "@/server/db/action/usersActions";
import SettingsLayout from "@/app/(pages)/account/(authenticated)/layout";
import { auth } from "@/auth";

export async function AuthenticatedAccountPage() {
    const session = await auth()
    const email = session?.user.email
    let feeds: any = email ? await getFeedsByUser(email) : []

    return (
        <SettingsLayout>
            <DataTable columns={ columnsFeed } data={ feeds }/>
        </SettingsLayout>
    )
}