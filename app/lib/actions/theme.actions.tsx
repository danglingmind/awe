"use server";
import { Theme } from "@prisma/client";
import prisma from "../prismaClient";

export async function getAllThemes(): Promise<Theme[]> {
  return prisma.theme
    .findMany()
    .then((themes) => {
      return themes;
    })
    .catch((err) => {
      throw err;
    });
}
