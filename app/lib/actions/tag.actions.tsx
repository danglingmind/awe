"use server";
import { Tag } from "@prisma/client";
import { auth } from "../auth";
import prisma from "../prismaClient";

export async function createTag(tag: Tag) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");
  const userId = await session.user?.id;
  return prisma.tag
    .create({
      data: tag,
      select: {
        id: true,
        name: true,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

export async function getTags(): Promise<Tag[]> {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");
  const userId = await session.user?.id;
  return prisma.tag
    .findMany({
      where: {
        ownerID: userId,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

export async function deleteTag(tagId: string) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");
  const userId = await session.user?.id;
  return prisma.tag
    .delete({
      where: {
        id: tagId,
        ownerID: userId,
      },
    })
    .catch((err) => {
      throw err;
    });
}
