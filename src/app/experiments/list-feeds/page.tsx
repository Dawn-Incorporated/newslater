import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import { feeds } from "@/db/schema";
import Link from "next/link";

export default async function ListFeeds() {
    const feeds_list = await db.select().from(feeds);

    return (
        <div className='flex flex-col w-screen p-6 h-screen gap-4 overflow-y-auto'>
            <h1 className="font-bold text-xl">Feeds</h1>
            <ul className='flex flex-col gap-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date added</TableCell>
                            <TableCell>Date verified</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feeds_list.map((feed, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="text-wrap line-clamp-2 max-w-64"><Link href={feed.url}>{feed.url}</Link></TableCell>
                                <TableCell>{feed.name}</TableCell>
                                <TableCell className="text-wrap line-clamp-2 max-w-xl">{feed.description}</TableCell>
                                <TableCell>{feed.category}</TableCell>
                                <TableCell>{feed.dateAdded}</TableCell>
                                <TableCell>{feed.dateVerified}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ul>
        </div>
    );
}