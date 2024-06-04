import { retrieveFeed } from "@/server/services/rss-retriever";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)

    const url = searchParams.get('url')

    if (!url) {
        return new Response('Missing required fields', {status: 400})
    }

    try {
        const result = await retrieveFeed(url)
        return new Response(JSON.stringify(result), {status: 200})
    } catch (error) {
        return new Response('An internal error occurred.', {status: 500})
    }
}