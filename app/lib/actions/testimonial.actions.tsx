"use server";
import type { TestimonialCreate } from "@/app/lib/model/testimonial";
import prisma from "../prismaClient";
import { Prisma, Testimonial } from "@prisma/client";
import { isIdValid } from "../utils";

/**
 * Creates a testimonial from the submitted form data.
 * @param formData Testimonial formdata
 * @returns testimonial ID
 */
export async function createTestimonial(formData: FormData) {}

function validateFindUniqueTestimonialInput(id: string) {
  return Prisma.validator<Prisma.TestimonialWhereUniqueInput>()({
    id,
  });
}

export async function testForm(formData: FormData) {
  console.log(formData);
}

/**
 * Get given testimonial for user
 * @param testimonialId testimonial ID
 * @param userId  user ID
 * @returns testimonial
 */
export async function getTestimonialForUser(
  testimonialId: string,
  userId?: string
) {
  try {
    const testimonial = await prisma.testimonial.findUniqueOrThrow({
      where: validateFindUniqueTestimonialInput(testimonialId),
    });

    if (testimonial.userId !== userId) {
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
  let testimonials: Testimonial[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving testimonials");
  }
  return testimonials;
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
