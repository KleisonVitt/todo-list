"use server";
import { prisma } from "@/utils/prismaClient";

export const newTask = async (task: string) => {
  try {
    if (!task) return;

    const newTask = await prisma.task.create({
      data: {
        title: task,
        completed: false,
      },
    });

    if (!newTask) return;

    return newTask;
  } catch (error) {
    throw error;
  }
};
