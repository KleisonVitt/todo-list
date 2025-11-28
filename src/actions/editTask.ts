"use server";
import { prisma } from "@/utils/prismaClient";

type EditTaskProps = {
  taskId: string;
  taskTitle: string;
};

export const editTask = async ({ taskId, taskTitle }: EditTaskProps) => {
  try {
    if (!taskId || !taskTitle) return;

    const editedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: taskTitle,
      },
    });

    if (!editedTask) return;
  } catch (error) {
    throw error;
  }
};
