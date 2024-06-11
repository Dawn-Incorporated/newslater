"use client"

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

export function SearchBar({feeds_list}: { feeds_list: any[] }) {
    const [feeds] = useState(feeds_list)
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
                                <QueryFeeds feeds={ feeds } value={ value } setValue={ setValue } setOpen={ setOpen }/>
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
export function QueryFeeds({value, setValue, setOpen, feeds}: { value: string, setValue: Function, setOpen: Function, feeds: any | null }) {
    const router = useRouter()

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