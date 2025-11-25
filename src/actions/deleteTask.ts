"use server";
import { prisma } from "@/utils/prismaClient";

export const deleteTask = async (taskId: string) => {
  try {
    if (!taskId) return;

    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    if (!deletedTask) return;

    return deletedTask;
  } catch (error) {
    throw error;
  }
};
