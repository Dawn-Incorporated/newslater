"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function SettingsLayout({children}: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">settings.</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <NavLink href={ "/account/settings" }>general</NavLink>
                        <NavLink href={ "/account/settings/security" }>security</NavLink>
                        <NavLink href={ "/account/settings/advanced" }>advanced</NavLink>
                    </nav>
                    <div className="grid gap-6">
                        { children }
                    </div>
                </div>
            </main>
        </div>
    )
}

function NavLink({href, children}: { href: string, children: ReactNode }) {
    const pathname = usePathname();

    return (
        <Link className={ pathname === href ? "font-semibold text-primary" : "" }
              href={ href }>
            { children }
        </Link>
    );
}