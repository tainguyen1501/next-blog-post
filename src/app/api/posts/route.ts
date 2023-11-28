import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import repo from "@/db/repo";

export async function GET() {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    const database = client.db('next-blog-post'); // Choose a name for your database

    const collection = database.collection('my-magic-collection'); // Choose a name for your collection

    await collection.insertOne({
        name: 'test',
        content: 'test'
    });

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
    const data = await request.json()
    const result = await repo.insertOne('my-magic-collection', data as any)
    return NextResponse.json(result.insertedId)
}