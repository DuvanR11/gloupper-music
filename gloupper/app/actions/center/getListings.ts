import { IParamsCenter } from "@/interfaces";
import prisma from "@/libs/prismadb";

export async function getListings(
  params: IParamsCenter
) {
  try {
    const {
      userId,
      centerId,
      locationValue,
      category,
      tag
    } = params;

    let query: any = {};

    if ( centerId ) {
      query.id = centerId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (tag && tag.length > 0) {
      query.services = {
        hasSome: tag
      };
    }

    if (locationValue) {
      query.city = locationValue;
    }

    const listings = await prisma.center.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw error;
  }
}
