import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/user";
import prisma from "@/libs/prismadb";

interface IParams {
  centerId?: string;
  center: any;
}


export async function GET(
  request: Request, 
  { params }: { params: IParams }
) {

  const { centerId } = params;

  if (!centerId || typeof centerId !== 'string') {
    throw new Error('Invalid ID');
  }


  const center = await prisma.center.findFirst({
    where: {
      id: centerId
    }
  });

  return NextResponse.json(center);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {

  const { centerId } = params;

  if (!centerId || typeof centerId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.center.deleteMany({
    where: {
      id: centerId,
    }
  });

  return NextResponse.json(listing);
}

export async function PUT(request: Request, 
  { params }: { params: IParams }
) {
  const { centerId } = params;

  if (!centerId || typeof centerId !== 'string') {
    throw new Error('Invalid ID');
  }

  const body = await request.json();
  const { 
    name,
    description,
    nit,
    image,
    tag,
    category,
    departament,
    city,
    images,
  } = body;


  const UpdateCenter = await prisma.center.update({
    where: {
      id: centerId,
    },
    data: {
      name,
      description,
      nit,
      tag,
      image,
      images,
      category,
      departament,
      city,
    },
  })

  console.log(UpdateCenter)
  return NextResponse.json(UpdateCenter);
}