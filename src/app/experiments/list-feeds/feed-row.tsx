"use client"

import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface FeedRowProps {
  id: string;
  index: number;
  url: string;
  name: string | null;
  description: string | null;
  category: string | null;
  dateAdded: string | null;
  dateVerified: string | null;
  pageOffset: number;
}

export function FeedRow({
  id,
  index,
  url,
  name,
  description,
  category,
  dateAdded,
  dateVerified,
  pageOffset
}: FeedRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/experiments/read-rss?s=${id}`);
  };

  return (
    <TableRow
      className="cursor-pointer hover:bg-gray-100"
      onClick={handleRowClick}
    >
      <TableCell>{index + 1 + pageOffset}</TableCell>
      <TableCell>{id}</TableCell>
      <TableCell className="text-wrap line-clamp-2 max-w-64">{url}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell className="text-wrap line-clamp-2 max-w-xl">{description}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{dateAdded}</TableCell>
      <TableCell>{dateVerified}</TableCell>
    </TableRow>
  );
}
