import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
    userId?: string;
}

export async function GET(
    request: Request, 
    { params }: { params: IParams }
  ) {

  const { userId } = params;

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid ID');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    }
  });

  return NextResponse.json(user);
}