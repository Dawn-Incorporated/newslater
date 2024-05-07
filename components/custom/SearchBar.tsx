'use client'

import { Suspense, useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SearchBar() {
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
                            ? feeds && feeds.find((feed: any) => feed.url === value)?.name || "Feed"
                            : "Feed" }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." className="h-9"/>
                        <CommandEmpty>No framework found.</CommandEmpty>
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
            const response = await fetch(`/api/v1/feed/readAll`);
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
            value={ feed.url }
            onSelect={ (currentValue) => {
                setValue(currentValue === value ? "" : currentValue)
                setOpen(false)
                router.push(`/feeds/${ encodeURIComponent(feed.url) }`)
            } }
        >
            { feed.name || feed.url }
        </CommandItem>
    ))
}