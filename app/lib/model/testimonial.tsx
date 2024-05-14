import prisma from "../prismaClient";
import { Prisma } from "@prisma/client";

export type TestimonialCreate = Prisma.PromiseReturnType<
  typeof prisma.testimonial.create
>;

export type TestimonialUpdate = Prisma.PromiseReturnType<
  typeof prisma.testimonial.update
>;

export type TestimonialDelete = Prisma.PromiseReturnType<
  typeof prisma.testimonial.delete
>;
