import service from "@/services";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const checkExist = await service.user.checkEmailExist(data.email)
  if (checkExist)
    return new NextResponse("Email existing", {
      status: 400,
    });
  const hashedPassword = await bcrypt.hash(data.password, 5);
  data.password = hashedPassword;
  const user = await service.user.create(data)
  return NextResponse.json(user);
}
