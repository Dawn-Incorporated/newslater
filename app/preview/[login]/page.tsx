'use client'

import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import useSWR from 'swr'

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.text())

export default function Home({params}: { params: { login: string } }) {
    const {data, error, isLoading} = useSWR(`/api/v1/user/preview?login=${params.login}`, fetcher)

    if (error) return <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl"}>Failed to load</div>
    if (isLoading) return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl animate-pulse">Loading</div>
    );

    return (
        <main>
            <div className={"absolute top-10 left-10"}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Preview ({params.login})</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className={"flex flex-col w-1/2 m-auto mt-10 mb-10 border-8 p-6 rounded-xl shadow-2xl"} dangerouslySetInnerHTML={data ? {__html: data} : undefined}></div>
        </main>
    );
}
