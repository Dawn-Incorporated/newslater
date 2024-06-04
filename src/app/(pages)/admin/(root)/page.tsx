'use client'

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(pages)/admin/(root)/data-table";
import { columns } from "@/app/(pages)/admin/(root)/columns";
import {getFeed} from "@/server/db/action/feedsActions";
import { FeedType } from "@/server/db/types";


export default function Feeds() {
    const [feeds, setFeeds] = useState<FeedType[]>([])

    useEffect(() => {
        async function getFeeds() {
            const data = await getFeed();
            setFeeds(data);
        }
        getFeeds();
    }, []);

    return feeds && (
        <>
            <DataTable columns={columns} data={feeds} />
        </>
    );
}
