"use server";

import { prisma } from "@/utils/prismaClient";

export const updateTaskCompletion = async (taskId: string) => {
  try {
    const currentTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!currentTask) return;

    const updatedStatusCompletion = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        completed: !currentTask.completed,
      },
    });

    if (!updatedStatusCompletion) return;

    console.log(updatedStatusCompletion);

    return updatedStatusCompletion;
  } catch (error) {
    throw error;
  }
};
