import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([{
        name: 'test',
        content: 'test'
    },
    {
        name: 'test2',
        content: 'test2'
    }])
}

export async function POST(request: Request) {
    return NextResponse.json(await request.json())
}