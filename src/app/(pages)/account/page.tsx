import { getFeedsByUser } from "@/server/db/action/usersActions";
import { auth } from "@/auth";
import { DataTable } from "@/app/(pages)/account/data-table";
import { columns } from "@/app/(pages)/account/columns";


export default async function Followed() {
    const session = await auth()
    let feeds: any[] = []

    if (session?.user?.email) {
        feeds = await getFeedsByUser(session?.user?.email)
    }

    return (
        <>
            <DataTable columns={columns} data={feeds} />
        </>
    )
}
