import { NextResponse } from "next/server";
import { URLSearchParams } from 'url';

import prisma from "@/libs/prismadb";


export async function GET( request: Request ) {

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search); 
  
    const senderId = searchParams.get('senderId') || '';
    const receiverId = searchParams.get('receiverId') || '';

  
    if ( !senderId && !receiverId ) {
      throw new Error('Invalid ID');
    }
  
    const chat = await prisma.chat.findFirst({
        where: {
          members: {
            hasEvery: [senderId, receiverId],
          },
        },
      });
  
    return NextResponse.json(chat);
  }
  