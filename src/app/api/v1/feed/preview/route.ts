import { retrieveFeed } from "@/server/services/rss-retriever";

export async function GET(request: Request) {

    try {
        const {searchParams} = new URL(request.url)

        const url = searchParams.get('url')

        if (!url) {
            return new Response('Missing required fields', {status: 400})
        }

        const result = await retrieveFeed(url)
        return new Response(JSON.stringify(result), {status: 200})
    } catch (error) {
        return new Response('An internal error occurred.', {status: 500})
    }
}