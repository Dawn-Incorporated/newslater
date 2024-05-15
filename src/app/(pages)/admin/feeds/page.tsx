'use client'

import { FeedFromDB } from "@/server/types";
import { useEffect, useState } from "react";
import { DataTable } from "@/app/(pages)/admin/feeds/data-table";
import { columns } from "@/app/(pages)/admin/feeds/columns";


export default function Feeds() {
    const [feeds, setFeeds] = useState<FeedFromDB[]>([])

    useEffect(() => {
        async function getFeeds() {
            const response = await fetch('/api/v1/feed/readAll');
            const data = await response.json();
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
