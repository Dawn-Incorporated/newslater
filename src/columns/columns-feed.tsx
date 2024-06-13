import { nameCell } from "@/columns/name-cell";

const handleUnfollowFeed = (row : any) => {
	console.log({...row.original, type: "unfollow"});
}

const handleVerifyFeed = (row : any) => {
	console.log({...row.original, type: "verify"});
}

const handleDeleteFeed = (row : any) => {
	console.log({...row.original, type: "delete"});
}

export const columnsFeed = nameCell(handleUnfollowFeed, handleVerifyFeed, handleDeleteFeed);