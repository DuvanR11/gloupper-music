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
      receiverId,
    } = body;
    
    const chat = await prisma.chat.create({
      data: { members: [senderId, receiverId] },
    });
    

    return NextResponse.json(chat);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
