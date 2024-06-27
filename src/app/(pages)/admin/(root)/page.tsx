import { Suspense } from "react";
import { FeedsTable } from "@/app/(pages)/admin/(root)/server";

export default function Feeds() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FeedsTable/>
        </Suspense>
    )
}