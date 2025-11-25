"use server";
import { prisma } from "@/utils/prismaClient";

export const getTasks = async () => {
  try {
    const tasks = prisma.task.findMany();

    if (!tasks) return;

    return tasks;
  } catch (error) {
    throw error;
  }
};
