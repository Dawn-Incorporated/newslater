import { getFeed } from "@/server/db/action/feedsActions";

export async function GET() {
    try {
        const feeds = await getFeed();
        return new Response(JSON.stringify(feeds), {status: 200})
    } catch (error) {
        return new Response('An internal error occurred.', {status: 500})
    }
}

export const dynamic = 'force-dynamic'
