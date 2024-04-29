'use client'

import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb";

export default function Home({params}: { params: { login: string } }) {
    const {login} = params;

    return (
        <main>
            <div className={"absolute top-10 left-10 max-sm:hidden"}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Preview ({login})</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className={"flex flex-col w-2/3 max-sm:w-screen m-auto mt-10 mb-10 border-8 p-6 rounded-xl shadow-2xl iframe"}>
                <iframe allowFullScreen={true} src={`/api/v1/user/preview?login=${login}`} className={"flex h-screen"}></iframe>
            </div>
        </main>
    );
}

export const dynamic = 'force-dynamic'
