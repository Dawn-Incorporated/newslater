import { Metadata } from "next"
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/custom/general/SidebarNav";

export const metadata: Metadata = {
    title: "newslater | Admin Panel",
    description: "Manage newslater subscribers, view analytics, and more.",
}

const sidebarNavItems = [
    {
        title: "Manage feeds",
        href: "/admin/feeds"
    },
    {
        title: "Manage accounts",
        href: "/admin/accounts"
    }
]
export default function AdminLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Administration Panel</h2>
                    <p className="text-muted-foreground">
                        Manage newslater subscribers, view analytics, and more.
                    </p>
                </div>
                <Separator className="my-6"/>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={ sidebarNavItems }/>
                    </aside>
                    <div className="flex-1">{ children }</div>
                </div>
            </div>
        </>
    )
}