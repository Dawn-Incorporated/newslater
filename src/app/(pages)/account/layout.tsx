import { SidebarNav } from "@/components/custom/general/SidebarNav";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import { auth } from "@/auth";

const sidebarNavItems = [
    {
        title: "followed",
        href: "/account"
    },
    {
        title: "available",
        href: "/account/available"
    },
    {
        title: "preview",
        href: "/account/preview"
    },
    {
        title: "settings",
        element: [
            {
                title: "account",
                href: "/account/settings"
            },
            {
                title: "security",
                href: "/account/settings/security"
            },
            {
                title: "advanced",
                href: "/account/settings/advanced"
            }
        ]
    }
]

export default async function SettingsLayout({children}: { children: ReactNode }) {
    const session = await auth()

    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">hello, { (session?.user?.name) }</h2>
                    <p className="text-muted-foreground">
                        manage your account, feed, mail and privacy settings.
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