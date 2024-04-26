const {main} = require('@/app/api/main')

export async function GET() {
    const cron = await main();
    return new Response(cron, {status: 200})
}

export const dynamic = "force-dynamic";