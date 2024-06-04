import { MailPreview } from "@/app/(pages)/account/preview/server";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Suspense } from "react";

export default function Preview() {
    return (
        <main className="flex flex-col flex-1">
            <div className="my-4 mx-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/account">Account</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Preview</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-col w-2/3 max-sm:w-screen m-auto mt-10 mb-10 border-8 p-6 rounded-xl shadow-2xl">
                <Suspense fallback={ <div>Loading...</div> }>
                    <MailPreview />
                </Suspense>
            </div>
        </main>
    );
}

export const dynamic = 'force-dynamic'
