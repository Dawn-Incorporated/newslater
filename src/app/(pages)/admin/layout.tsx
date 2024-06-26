import { Metadata } from "next"
import { Separator } from "@/components/ui/separator";
import { SideNavbar } from "@/components/app/nav/side-navbar";

export const metadata: Metadata = {
    title: "newslater | Admin Panel",
    description: "Manage newslater subscribers, view analytics, and more.",
}

const sidebarNavItems = [
    {
        title: "manage feeds",
        href: "/admin"
    },
    {
        title: "manage accounts",
        href: "/admin/accounts"
    }
]
export default function AdminLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <div className="space-y-6 p-10 pb-16">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">administration.</h2>
                    <p className="text-muted-foreground">
                        manage newslater subscribers, view analytics, and more.
                    </p>
                </div>
                <Separator className="my-6"/>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SideNavbar items={ sidebarNavItems }/>
                    </aside>
                    <div className="flex-1">{ children }</div>
                </div>
            </div>
        </>
    )
}