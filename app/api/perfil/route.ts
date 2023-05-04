import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    currentUser,
    name,
    phoneNumber,
    idCard,
   } = body;

   const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      name,
      phoneNumber,
      idCard,
    }
  });
    

  return NextResponse.json(user);
}
