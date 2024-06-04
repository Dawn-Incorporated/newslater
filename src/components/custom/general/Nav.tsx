'use client'

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, Menu, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Nav() {
    const {data: session, status, update} = useSession()

    return (
        <div className="flex w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <h1 className="header">newslater.</h1>
                    </Link>
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                        home
                    </Link>
                    <Link href={ "/feeds" } className="text-muted-foreground transition-colors hover:text-foreground">
                        feeds
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
                                home
                            </Link>
                            <Link href={ "/feeds" } className="text-muted-foreground transition-colors hover:text-foreground">
                                feeds
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <SearchBar/>
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
                                    <Link href={ "/account" }>
                                        <DropdownMenuItem className="cursor-pointer">account</DropdownMenuItem>
                                    </Link>
                                    <Link href={ "/account/settings" }>
                                        <DropdownMenuItem className="cursor-pointer">settings</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-500"
                                        onClick={ () => signOut() }
                                    >Sign out</DropdownMenuItem>
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

export function SearchBar() {
    const [feeds, setFeeds] = useState<any>(null);
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState("")

    return (
        <>
            <Popover open={ open } onOpenChange={ setOpen }>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={ open }
                        className="pl-8 sm:min-w-[300px] md:min-w-[200px] lg:min-w-[100px]"
                    >
                        { value
                            ? feeds && feeds.find((feed: any) => feed.name === value)?.name || "Feed"
                            : "feed" }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search feeds..." className="h-9"/>
                        <CommandEmpty>No feed found.</CommandEmpty>
                        <CommandGroup><CommandList>
                            <Suspense fallback={ <CommandItem>Loading...</CommandItem> }>
                                <QueryFeeds feeds={ feeds } setFeeds={ setFeeds } value={ value } setValue={ setValue } setOpen={ setOpen }/>
                            </Suspense>
                        </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

        </>
    )
}

/**
 * Get feeds from the server
 * To use with Suspense
 */
export function QueryFeeds({value, setValue, setOpen, feeds, setFeeds}: { value: string, setValue: Function, setOpen: Function, feeds: any | null, setFeeds: Function }) {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        fetchFeeds();
    }, []);

    const fetchFeeds = async () => {
        try {
            const response = await fetch(`/api/v1/feed`);
            const data = await response.json();
            setFeeds(data);
        } catch (err: Error | any) {
            const error = err?.message || "Unknown error occurred.";
            setError(error);
            toast.error(`An error occurred.`, {
                description: error
            });
        }
    }

    if (error) {
        return <CommandItem disabled>An error occurred.</CommandItem>;
    }

    if (!feeds) {
        return <CommandItem disabled>Loading...</CommandItem>;
    }

    return feeds.map((feed: any) => (
        <CommandItem
            key={ feed.url }
            value={ feed.name }
            onSelect={ (currentValue) => {
                setValue(currentValue)
                setOpen(false)
                router.push(`/feeds/${ encodeURIComponent(feed.url) }`)
            } }
        >
            { feed.name || feed.url }
        </CommandItem>
    ))
}