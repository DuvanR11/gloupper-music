import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/user";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const {
      name,
      description,
      nit,
      tag,
      category,
      location,
      image,
      images,
    } = body;

    
    const center = await prisma.center.create({
      data: {
        name,
        description,
        nit,
        tag,
        category,
        departament: 'Huila',
        city: location,
        image,
        images,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    

    return NextResponse.json(center);
  } catch (error) {
    // Manejar otros errores no previstos
    console.error("Error:", error);
    return NextResponse.error();
  }
}
