const feedController = require('@api/_system/controller/FeedController');


export async function GET() {
    try {
        const feeds = await feedController.getAll();
        return new Response(JSON.stringify(feeds), {status: 200})
    } catch (error) {
        return new Response('An internal error occurred.', {status: 500})
    }
}

export const dynamic = 'force-dynamic'
