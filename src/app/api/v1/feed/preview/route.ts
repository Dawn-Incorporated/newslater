import { auth } from "@/auth";
import { retrieveFeed } from "@/server/services/rss-retriever";
import { NextAuthRequest } from "next-auth/lib";

export const GET = auth(async function GET(request: NextAuthRequest) {
    if (!request.auth) {
        return new Response('Unauthorized', {status: 401})
    }

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
})