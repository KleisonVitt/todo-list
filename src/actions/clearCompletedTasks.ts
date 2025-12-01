"use server";
import { prisma } from "@/utils/prismaClient";

export const deleteCompletedTasks = async () => {
  try {
    await prisma.task.deleteMany({
      where: { completed: true },
    });

    const allTasks = await prisma.task.findMany();
    if (!allTasks) return;

    return allTasks;
  } catch (error) {
    throw error;
  }
};
