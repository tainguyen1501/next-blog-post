import { NextRequest, NextResponse } from "next/server";
import repo from "@/db/repo";
import { IBaseQueryModel } from "@/models/common";
export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const size = request.nextUrl.searchParams.get("size");
  const searchText = request.nextUrl.searchParams.get("searchText");
  const sortBy = request.nextUrl.searchParams.get("sortBy");

  let query: IBaseQueryModel = {
    page: Number(page),
    size: Number(size),
  };
  if (searchText)
    query.filter = { title: { $regex: searchText } };
  
  if (sortBy)
    query.sort = {
      by: sortBy,
      desc: (request.nextUrl.searchParams.get("desc") || "false") === "true",
    };
  const result = await repo.find("my-magic-collection", query);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const data = await request.json();
  const result = await repo.insert("my-magic-collection", data as any);
  return NextResponse.json(result.insertedId);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const result = await repo.update("my-magic-collection", data as any);
  return NextResponse.json(result);
}