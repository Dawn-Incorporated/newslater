"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

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

export function SideNavbar({className, items, ...props}: SidebarNavProps) {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});

    const toggleExpand = (key: string) => {
        setExpandedItems(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const renderItems = (items: SidebarNavItem[], level = 0, isFirstChild = false) => {
        return items.map((item, index) => {
            const hasChildren = item.element && item.element.length > 0;
            const isExpanded = expandedItems[item.href || item.title];

            return (
                <div
                    key={item.href || item.title}
                    style={{
                        marginLeft: `${level * 20}px`,
                        marginTop: level !== 0 && index === 0 ? '10px' : undefined,
                    }}
                >
                    <div className={"flew items-center"}>

                        {item.href ? (
                            <Link
                                href={item.href}
                                className={cn(
                                    buttonVariants({variant: 'ghost'}),
                                    pathname === item.href
                                        ? 'bg-muted hover:bg-muted'
                                        : 'hover:bg-transparent hover:underline',
                                    'justify-start ml-4 w-[70%]'
                                )}
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <div
                                className={cn(
                                    buttonVariants({variant: 'ghost'}),
                                    'justify-start hover:cursor-pointer ml-4 gap-2 w-[70%]'
                                )}
                                onClick={() => toggleExpand(item.href || item.title)}
                            >
                                {item.title}
                                {hasChildren && (
                                    <button onClick={() => toggleExpand(item.href || item.title)}>
                                        {isExpanded ? <ChevronDown size={13}/> : <ChevronRight size={13}/>}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    {hasChildren && isExpanded && item.element !== undefined && renderItems(item.element, level + 1, true)}
                </div>
            );
        });
    };

    return (
        <nav
            className={cn(
                'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
                className
            )}
            {...props}
        >
            {renderItems(items)}
        </nav>
    );
}