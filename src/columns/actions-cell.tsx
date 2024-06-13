'use client'

import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { unfollowFeed } from "@/server/db/action/followActions";
import { toast } from "sonner";
import { deleteFeed, verifyFeed } from "@/server/db/action/feedsActions";

export function ActionsCell({row}: any) {
	const feedURL = row.original.url;
	const router = useRouter();
	const {data: session} = useSession()

	const handleOpenFeed = () => {
		router.push(`/feeds/${ encodeURIComponent(feedURL) }`);
	};

	const handleDeleteFeed = async () => {
		if (session?.user?.email && feedURL) {
			const remove = await deleteFeed(feedURL)
			if (remove) {
				router.refresh()
				return toast.success("Feed deleted")
			}
			return toast.error("Failed to delete feed")
		}

	}

	const handleVerifyFeed = async () => {
		if (session?.user?.email && feedURL) {
			const verified = await verifyFeed(feedURL)
			if (verified) {
				router.refresh()
				return toast.success("Feed verified")
			}
			return toast.error("Failed to verify feed")
		}
	}

	const handleUnfollowFeed = async () => {
		if (session?.user?.email && feedURL) {
			const remove = await unfollowFeed(session.user.email, feedURL)
			if (remove) {
				router.refresh()
				return toast.success("Feed unfollowed")
			}
			return toast.error("Failed to unfollow feed")
		}
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
				<DropdownMenuItem onClick={ handleOpenFeed }>
					Open
				</DropdownMenuItem>
				<DropdownMenuSeparator/>
				{ usePathname().includes("/admin") ?
					(
						<>
							<DropdownMenuItem onClick={ handleVerifyFeed }>
								Verify
							</DropdownMenuItem>
							<DropdownMenuItem onClick={ handleDeleteFeed }>
								Delete
							</DropdownMenuItem>
						</>
					) :
					<>
						<DropdownMenuItem onClick={ handleUnfollowFeed }>
							Unfollow
						</DropdownMenuItem>
					</>
				}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}