import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    const { url, name, category, description, website } = await request.json();

    if (!url || !name || !category) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        // todo: repair backend
        // const newFeed = await FeedRepository.create(url, name, description, website, category);

        return NextResponse.json({ success: true, /*feed: newFeed */}, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}