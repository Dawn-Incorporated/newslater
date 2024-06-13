"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FeedType } from "@/server/db/types";
import { ActionsCell } from "@/columns/actions-cell";

export const columnsFeed: ColumnDef<FeedType>[] = [
	{
		id: "select",
		header: ({table}) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({row}) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	},
	{
		accessorKey: "name",
		header: ({column}) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Name
				<ArrowUpDown className="ml-2 h-4 w-4"/>
			</Button>
		)
	},
	{
		accessorKey: "description",
		header: "Description"
	},
	{
		accessorKey: "url",
		header: "URL",
	},
	{
		accessorKey: "categorie",
		header: ({column}) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Category
				<ArrowUpDown className="ml-2 h-4 w-4"/>
			</Button>
		)
	},
	{
		id: "actions",
		cell: ({row}) => <ActionsCell row={row}/>
	}
];