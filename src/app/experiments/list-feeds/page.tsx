import { PaginationControls } from "@/app/experiments/list-feeds/client";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import { feeds } from "@/db/schema";
import { count } from "drizzle-orm";
import Link from "next/link";

export default async function ListFeeds({searchParams}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const page = (await searchParams).page ?? "1";
    const feeds_list = await db.select().from(feeds).limit(10).offset((parseInt(page) - 1) * 10);
    const feeds_number = (await db.select({feeds_number: count()}).from(feeds))[0].feeds_number ?? 0;
    
    return (
        <div className="flex flex-col w-screen p-6 h-screen gap-4 overflow-y-auto">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Feeds</h1>
                
                <PaginationControls totalPages={ Math.ceil(feeds_number / 10) }/>
            
            </div>
            <ul className="flex flex-col gap-2">
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
                        { feeds_list.map((feed, index) => (
                            <TableRow key={ index }>
                                <TableCell>{ index + 1 + (parseInt(page) - 1) * 10 }</TableCell>
                                <TableCell className="text-wrap line-clamp-2 max-w-64"><Link href={ feed.url }>{ feed.url }</Link></TableCell>
                                <TableCell>{ feed.name }</TableCell>
                                <TableCell className="text-wrap line-clamp-2 max-w-xl">{ feed.description }</TableCell>
                                <TableCell>{ feed.category }</TableCell>
                                <TableCell>{ feed.dateAdded }</TableCell>
                                <TableCell>{ feed.dateVerified }</TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </ul>
        </div>
    );
}