import { auth } from "@/auth";
import { SignoutButton } from "@/components/app/general/signout-button";
import { SearchBar } from "@/components/app/nav/search-bar";
import { libre_baskerville } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getFeed } from "@/server/db/action/feedsActions";
import { CircleUser, Menu, Search } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
    const session = await auth();

    return (
        <div className="flex w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <h1 className={ cn(libre_baskerville.className, "header") }>newslater.</h1>
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
                                <h1 className={ cn(libre_baskerville.className, "header") }>newslater.</h1>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <SearchBarWithData/>
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
                            { session?.user ? (
                                <>
                                    <DropdownMenuLabel>
                                        Hello { session?.user?.name || "N/A" }
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <Link href={ "/account" }>
                                        <DropdownMenuItem className="cursor-pointer">account</DropdownMenuItem>
                                    </Link>
                                    <Link href={ "/account/settings" }>
                                        <DropdownMenuItem className="cursor-pointer">settings</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator/>
                                    <SignoutButton/>
                                </>
                            ) : (

                                <Link href={ "/account" }>
                                    <DropdownMenuItem className="cursor-pointer">Sign in</DropdownMenuItem>
                                </Link>
                            ) }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
    );
}

async function SearchBarWithData() {
    "use server"
    const feeds = await getFeed();

    return (
        <SearchBar feeds_list={ feeds }/>
    )
}
