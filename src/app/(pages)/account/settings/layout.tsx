"use client"

import { SidebarNav } from "@/components/custom/general/SidebarNav";
import { Separator } from "@/components/ui/separator";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const sidebarNavItems = [
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

export default function SettingsLayout({children}: { children: ReactNode }) {
    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">settings.</h2>
                    <p className="text-muted-foreground">
                        manage your account, mail and privacy settings.
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