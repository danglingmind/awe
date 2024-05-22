"use server";
import { Form } from "@prisma/client";
// TODO: IMPORTANT: NEED TO ADD THROTTLING ON THIS API, AS IT IS A PUBLIC API.

import prisma from "../prismaClient";

// TODO: IMPORTANT: NEED TO ADD THROTTLING ON THIS API, AS IT IS A PUBLIC API.
/**
 * Creates a custom testimonial form
 * @returns id of created testimonial form
 */
export async function createTestimonialForm(formData: FormData) {
  console.log("create form: ", formData);

  const questions = formData.getAll("question").map((que) => String(que));

  const data = {
    title: formData?.get("title")?.toString() ?? "",
    description: formData.get("thoughts")?.toString() ?? "",
    enableImageUpload: Boolean(formData.get("enable_image")) ?? false,
    enableVideoUpload: Boolean(formData.get("enable_video")) ?? false,
    enableRating: Boolean(formData.get("enable_rating")) ?? false,
    questions: questions,
    userId: formData.get("userId")?.toString() ?? "",
  };

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
export default async function updateForm(formData: FormData) {
  console.log("update form:", formData);

  const questions = formData.getAll("question").map((que) => String(que));

  const formId = formData.get("id")?.toString() ?? "";
  const data = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("thoughts")?.toString() ?? "",
    enableImageUpload: Boolean(formData.get("enable_image")) ?? false,
    enableVideoUpload: Boolean(formData.get("enable_video")) ?? false,
    enableRating: Boolean(formData.get("enable_rating")) ?? false,
    questions: questions,
    userId: formData.get("userId")?.toString() ?? "",
  };

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
    })
    .then((form) => {
      return form;
    })
    .catch((err) => {
      throw err;
    });
}
