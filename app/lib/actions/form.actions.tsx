"use server";
import { Form, Prisma, Question } from "@prisma/client";
// TODO: IMPORTANT: NEED TO ADD THROTTLING ON THIS API, AS IT IS A PUBLIC API.

import prisma from "../prismaClient";

// TODO: IMPORTANT: NEED TO ADD THROTTLING ON THIS API, AS IT IS A PUBLIC API.
/**
 * Creates a custom testimonial form
 * @returns id of created testimonial form
 */
export async function createTestimonialForm(data: Form) {
  prisma.form
    .create({
      data: data,
      select: { id: true },
    })
    .then((d) => console.log("form inserted:", d))
    .catch((error) => console.error(error));

  return true;
}

/**
 * Update or create Testimonial form.
 * @param formData Testimonial form's form data.
 */
export default async function updateForm(
  formId: string,
  data: Prisma.FormUpdateInput
) {
  // update the form
  prisma.form
    .update({
      where: {
        id: formId,
      },
      data: data,
    })
    .then(() => console.log("upserted"))
    .catch((error) => {
      throw error;
    });

  return true;
}

/**
 * Gets all forms for a user
 * @param userId user ID of user
 * @returns array of forms
 */
export async function getAllFormsForUser(userId?: string): Promise<Form[]> {
  if (!userId?.trim()) {
    throw new Error("User ID is required");
  }
  let forms: Form[] = [];

  try {
    forms = await prisma.form.findMany({
      where: { userId: userId },
      orderBy: { updatedAt: "desc" },
      include: { questions: true, boards: true, tags: true },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  return forms;
}

export async function deleteForm(formId: string, userId: string) {
  if (!userId?.trim()) {
    throw new Error("user ID is requried");
  }

  prisma.form
    .delete({
      where: {
        userId: userId,
        id: formId,
      },
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw err;
    });
}

export async function getForm(formId: string) {
  return prisma.form
    .findFirst({
      where: {
        id: formId,
      },
      include: { questions: true, boards: true, tags: true },
    })
    .then((form) => {
      return form;
    })
    .catch((err) => {
      throw err;
    });
}
