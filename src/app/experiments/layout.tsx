"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ExperimentsLayout({children}: { children: ReactNode }) {
    const pathname = usePathname();
    
    return (
        <main className="flex flex-col w-screen h-screen">
            <div className="flex flex-col border-b w-screen p-4 pb-2 gap-2">
                <div className="flex gap-2 items-baseline">
                    <h1 className="text-xl font-bold">Experiments</h1>
                    <p>A collection of experiments and tests.</p>
                </div>
                <div className="flex">
                    <Link href="/experiments/read-rss" className={cn("rounded w-fit p-1", pathname.includes("/read-rss") ? "bg-gray-100" : "")}>Read RSS</Link>
                    <Link href="/experiments/list-feeds" className={cn("rounded w-fit p-1", pathname.includes("/list-feeds") ? "bg-gray-100" : "")}>List Feeds</Link>
                </div>
            </div>
            
            { children }
        </main>
    )
    
}