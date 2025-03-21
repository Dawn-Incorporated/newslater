import { PaginationControls } from "@/app/experiments/list-feeds/client";
import { FeedRow } from "@/app/experiments/list-feeds/feed-row";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import { feeds } from "@/db/schema";
import { count } from "drizzle-orm";

export default async function ListFeeds({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const page = (await searchParams).page ?? "1";
    const pageNumber = parseInt(page);
    const feeds_list = await db.select().from(feeds).limit(10).offset((pageNumber - 1) * 10);
    const feeds_number = (await db.select({ feeds_number: count() }).from(feeds))[0].feeds_number ?? 0;

    return (
        <div className="flex flex-col w-screen p-6 h-screen gap-4 overflow-y-auto">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Feeds</h1>

                <PaginationControls totalPages={Math.ceil(feeds_number / 10)} />
            </div>
            
            <ul className="flex flex-col gap-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>UUID</TableCell>
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
                            <FeedRow
                                key={index}
                                id={feed.id}
                                index={index}
                                url={feed.url}
                                name={feed.name}
                                description={feed.description}
                                category={feed.category}
                                dateAdded={feed.dateAdded}
                                dateVerified={feed.dateVerified}
                                pageOffset={(pageNumber - 1) * 10}
                            />
                        ))}
                    </TableBody>
                </Table>
            </ul>
        </div>
    );
}