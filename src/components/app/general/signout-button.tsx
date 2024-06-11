"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function SignoutButton() {
    return (
        <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={ () => signOut() }
        >Sign out</DropdownMenuItem>
    )
}