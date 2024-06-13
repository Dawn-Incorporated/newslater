'use client'

import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";

export function ActionsCell({row}: any) {
	const feed = row.original;
	const router = useRouter();

	const handleOpenFeed = () => {
		router.push(`/feeds/${encodeURIComponent(feed.url)}`);
	};

	const handleDeleteFeed = (row: any) => {
		console.log("Deleting feed", row);

	}

	const handleVerifyFeed = (row: any) => {
		console.log("Verifying feed", row);
	}

	const handleUnfollowFeed = (row: any) => {
		console.log("Unfollowing feed", row);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4"/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={handleOpenFeed}>
					Open
				</DropdownMenuItem>
				<DropdownMenuSeparator/>
				{usePathname().includes("/admin") ?
					(
						<>
							<DropdownMenuItem onClick={() => handleVerifyFeed(row)}>
								Verify
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleDeleteFeed(row)}>
								Delete
							</DropdownMenuItem>
						</>
					) :
					<>
						<DropdownMenuItem onClick={() => handleUnfollowFeed(row)}>
							Unfollow
						</DropdownMenuItem>
					</>
				}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}