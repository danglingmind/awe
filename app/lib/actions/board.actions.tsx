"use server";

import { Board } from "@prisma/client";
import { BoardModel } from "../model/models";
import prisma from "../prismaClient";

export async function createBoard(board: BoardModel) {
  const themesConnectOrCreate = board.themes.map((theme) => {
    return {
      where: { id: theme.id },
      create: {
        id: theme.id,
        name: theme.name,
      },
    };
  });

  const tagsConnectOrCreate = board.tags?.map((tag) => {
    return {
      where: { id: tag.id },
      create: {
        id: tag.id,
        name: tag.name,
      },
    };
  });

  prisma.board
    .create({
      data: {
        active: board.active,
        name: board.name,
        userId: board.userId,
        description: board.description,
        embedLink: board?.embedLink ?? "",
        themes: { connectOrCreate: themesConnectOrCreate },
        tags: { connectOrCreate: tagsConnectOrCreate },
      },
    })
    .then(() => console.log("board Created"))
    .catch((err) => {
      throw err;
    });
  return true;
}

export async function updateBoard(board: BoardModel) {}

export async function getAllUserBoards(userId?: string): Promise<Board[]> {
  if (!userId?.trim()) {
    throw new Error("Invalid user ID");
  }

  return prisma.board
    .findMany({
      where: {
        userId: userId,
      },
      include: {
        themes: true,
        tags: true,
      },
    })
    .then((boards) => {
      return boards;
    })
    .catch((err) => {
      throw err;
    });
}

export async function getBoard(boardID: string): Promise<Board> {
  return prisma.board
    .findUnique({
      where: {
        id: boardID,
      },
      include: {
        themes: true,
        tags: true,
        testimonials: true,
      },
    })
    .then((board) => {
      if (board) {
        return board;
      } else {
        throw new Error("Board not found");
      }
    })
    .catch((err) => {
      throw err;
    });
}
