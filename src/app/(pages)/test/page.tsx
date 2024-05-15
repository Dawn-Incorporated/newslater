
import { db } from "@/server/db"
import { feeds } from "@/server/db/schema"

export default async function Test() {
    return <>
        <ul>
            <Feeds />
        </ul>
    </>
}

async function Feeds() {
    const res = await db.select().from(feeds)

    return res.map((feed) => {
        return <li key={feed.url}>{feed.name}</li>
    })
}