'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Preview() {
    const login = 'vanhovev'

    return (
        <main className="flex flex-col flex-1">
            <div className="my-4 mx-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Preview ({ login })</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className={"flex flex-col w-2/3 max-sm:w-screen m-auto mt-10 mb-10 border-8 p-6 rounded-xl shadow-2xl h-screen-bt-spacing"}>
                <iframe src={`/api/v1/user/preview`} className={"flex h-screen"}></iframe>
            </div>
        </main>
    );
}

export const dynamic = 'force-dynamic'
