'use client'

import { useEffect, useState } from "react";

import {getFeed} from "@/server/db/action/feedsActions";
import { FeedType } from "@/server/db/types";
import { DataTable } from "@/components/data/data-table";
import { columns } from "@/app/(pages)/account/columns";


export default function Feeds() {
    const [feeds, setFeeds] = useState<FeedType[]>([])

    useEffect(() => {
        async function getFeeds() {
            const data = await getFeed();
            console.log(data);
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
