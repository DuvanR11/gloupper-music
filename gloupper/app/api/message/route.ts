import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/user";


export async function POST(request: Request ) {
  try {
    const currentUser = await getCurrentUser();


    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const {
      senderId,
      text,
      chatId
    } = body;
    
    const message = await prisma.message.create({
      data: {
        senderId, 
        text,
        chat: {
          connect: {
           id: chatId,
          },
        }
    },
    });
    

    return NextResponse.json(message);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
