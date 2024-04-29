const rss_retriever = require('@api/services/rss-retriever')

export async function GET(request: Request) {

    try {
        const {searchParams} = new URL(request.url)
        const result = await rss_retriever.retrieveFeed(searchParams.get('url'))
        return new Response(JSON.stringify(result), {status: 200})
    } catch (error) {
        return new Response('An internal error occurred.', {status: 500})
    }
}