'use client'

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, Menu, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/custom/SearchBar";

export default function Header() {
    const {data: session, status, update} = useSession()

    return (
        <div className="flex w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <h1 className="header">Newslater</h1>
                    </Link>
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                        Home
                    </Link>
                    <Link href="/feeds" className="text-muted-foreground transition-colors hover:text-foreground">
                        Feeds
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                                <h1 className="header">Newslater</h1>
                            </Link>
                            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                                Home
                            </Link>
                            <Link href="/feeds" className="text-muted-foreground transition-colors hover:text-foreground">
                                Feeds
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <SearchBar />
                        </div>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            { status === 'authenticated' ? (
                                <>
                                    <DropdownMenuLabel>
                                        Hello { session?.user?.name || "N/A" }
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <Link href="/account">
                                        <DropdownMenuItem className="cursor-pointer">My Account</DropdownMenuItem>
                                    </Link>
                                    <Link href="/api/auth/signout">
                                        <DropdownMenuItem className="cursor-pointer text-red-500">Sign out</DropdownMenuItem>
                                    </Link>
                                </>
                            ) : (

                                <Link href="/account">
                                    <DropdownMenuItem className="cursor-pointer">Sign in</DropdownMenuItem>
                                </Link>
                            )
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
    );
}