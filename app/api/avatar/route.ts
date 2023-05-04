import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    image,
    currentUser
   } = body;

   const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      image,
    }
  });


  return NextResponse.json(user);
}
