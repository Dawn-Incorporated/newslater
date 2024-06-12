import { auth } from "@/auth";
import { SideNavbar } from "@/components/app/nav/side-navbar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/server/db";
import { auth_users } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { ReactNode } from "react";
import SignedInSecurity from "@/context/SignedInSecurity";

const sidebarNavItems = (isAdmin = false) => {
    const items = [
        {
            title: "followed",
            href: "/account"
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
    ];
    if (isAdmin) {
        items.push({
            title: "admin",
            href: "/admin"
        });
    }

    return items;
};

export default async function SettingsLayout({children}: { children: ReactNode }) {
    const session = await auth()
    const name = session?.user?.name
    let isAdmin: boolean = session?.user?.settings.isAdmin ?? false

    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">hello, { name }.</h2>
                    <p className="text-muted-foreground">
                        manage your account, feed, mail and privacy settings.
                    </p>
                </div>
                <Separator className="my-6"/>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SideNavbar items={ sidebarNavItems(isAdmin) }/>
                    </aside>
                    <div className="flex-1">{ children }</div>
                </div>
            </div>
        </>
    )
}