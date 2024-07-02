"use server";
import type { TestimonialCreate } from "@/app/lib/model/testimonial";
import prisma from "../prismaClient";
import { Prisma, Testimonial } from "@prisma/client";
import { isIdValid } from "../utils";
import { auth } from "../auth";

// TODO: RATE LIMIT THIS API
/**
 * Creates a testimonial from the submitted form data.
 * @param testimonial Testimonial formdata
 * @returns testimonial ID
 */
export async function createTestimonial(
  testimonial: Prisma.TestimonialCreateInput
) {
  return prisma.testimonial
    .create({
      data: testimonial,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Get given testimonial for user
 * @param testimonialId testimonial ID
 * @param userId  user ID
 * @returns testimonial
 */
export async function getTestimonialForUser(testimonialId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  try {
    const testimonial = await prisma.testimonial.findUniqueOrThrow({
      where: { id: testimonialId },
      include: {
        owner: true,
        answers: {
          select: {
            id: true,
            answer: true,
            question: true,
          },
        },
        tags: true,
        themes: true,
        boards: true,
      },
    });

    if (testimonial.ownerID !== session.user?.id) {
      throw new Error("Testimonial does not belong to user");
    }

    return testimonial;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving testimonial");
  }
}

/**
 * Gets all testimonial for given user
 * @param userId user ID
 * @returns list of testimonials
 */
export async function getAllTestimonialsForUser(
  userId?: string
): Promise<Testimonial[]> {
  if (!userId?.trim()) {
    throw new Error("User ID is required");
  }

  return await prisma.testimonial
    .findMany({
      where: { ownerID: userId },
      orderBy: { updatedAt: "desc" },
      include: {
        owner: true,
        answers: {
          select: {
            id: true,
            answer: true,
            question: true,
          },
        },
        tags: true,
        themes: true,
        boards: true,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Error retrieving testimonials");
    });
}

/**
 * Deletes a testimonial
 * @param id testimonial ID to delete
 * @returns boolean
 */
export async function deleteTestimonial(id: string) {
  try {
    prisma.testimonial.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete the testimonial");
  }
  return true;
}

// upsert testimonial
export async function updateOrCreateTestimonial() {}

export async function getFilteredTestimonial(filters: {
  [key: string]: string[];
}) {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  console.log("incoming filters", filters);
  const tagIds = filters["tags"];
  const boardIds = filters["boards"];
  const themeIds = filters["themes"];

  let whereClause = {};

  whereClause = { ownerID: session.user?.id };

  if (tagIds?.length) {
    whereClause = {
      ...whereClause,
      tagIDs: {
        hasEvery: tagIds,
      },
    };
  }
  if (boardIds?.length) {
    whereClause = {
      ...whereClause,
      boardIDs: {
        hasEvery: boardIds,
      },
    };
  }
  if (themeIds?.length) {
    whereClause = {
      ...whereClause,
      themeIDs: {
        hasEvery: themeIds,
      },
    };
  }

  console.log(whereClause);

  return prisma.testimonial.findMany({
    where: whereClause,
    include: {
      owner: true,
      answers: {
        select: {
          id: true,
          answer: true,
          question: true,
        },
      },
      tags: true,
      themes: true,
      boards: true,
    },
  });
}
