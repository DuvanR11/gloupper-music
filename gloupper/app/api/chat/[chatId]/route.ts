import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/user";
import prisma from "@/libs/prismadb";

interface IParams {
  chatId?: string;
}

export async function GET(
    request: Request, 
    { params }: { params: IParams }
  ) {
  
    const { chatId } = params;
  
    if (!chatId || typeof chatId !== 'string') {
      throw new Error('Invalid ID');
    }

    console.log(chatId)
  
    const chat = await prisma.chat.findMany({
      where: {
        members: {
            has: chatId
        }
      }
    });
  
    return NextResponse.json(chat);
  }
