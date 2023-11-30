import { NextResponse } from "next/server";
import repo from "@/db/repo";
export async function GET(req: any, { params }: any) {
  const result = await repo.findOne("post", params.id);
  return NextResponse.json(result);
}

export async function DELETE(req: any, { params }: any) {
  const result = await repo.delete("post", params.id);
  return NextResponse.json(result);
}
