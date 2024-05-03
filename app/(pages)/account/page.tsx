'use client'

import { useSession } from "next-auth/react";

export default function Account() {
    const {data: session, status, update} = useSession()

    if (status === 'authenticated') {
        return <p>You are authenticated.</p>
    } else {
        return <p>You are not authenticated.</p>
    }
}