"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavItem {
    title: string;
    href?: string;
    element?: SidebarNavItem[];
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href?: string
        title: string
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname();

    const renderItems = (items: SidebarNavItem[], level = 0, isFirstChild = false) => {
        return items.map((item, index) => (
            <div
                key={item.href || item.title}
                style={{
                    marginLeft: `${level * 20}px`,
                    marginTop: level !== 0 && index === 0 ? '10px' : undefined
                }}
            >
                {item.href ? (
                    <Link
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:bg-transparent hover:underline",
                            "justify-start"
                        )}
                    >
                        {item.title}
                    </Link>
                ) : (
                    <div
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "justify-start"
                        )}
                    >
                        {item.title}
                    </div>
                )}
                {item.element && renderItems(item.element, level + 1, true)}
            </div>
        ));
    };

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {renderItems(items)}
        </nav>
    );
}