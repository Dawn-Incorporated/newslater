"use client"

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function PaginationControls({totalPages}: { totalPages: number }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = searchParams.get("page") || "1"
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            
            return params.toString()
        },
        [searchParams]
    )
    
    return (
        <div className="flex items-center gap-4">
            <Button onClick={ () => router.push(`${ pathname }?${ createQueryString("page", (parseInt(currentPage) - 1).toString()) }`) } disabled={ parseInt(currentPage) === 1 } variant="outline" className="cursor-pointer">
                Previous
            </Button>
            
            <p>{ currentPage }</p>
            
            <Button onClick={ () => router.push(`${ pathname }?${ createQueryString("page", (parseInt(currentPage) + 1).toString()) }`) } disabled={ parseInt(currentPage) === totalPages } variant="outline" className="cursor-pointer">
                Next
            </Button>
        </div>
    )
}