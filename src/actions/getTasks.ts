"use server";
import { prisma } from "@/utils/prismaClient";

export const getTasks = async () => {
  const tasks = prisma.task.findMany();

  if (!tasks) return;

  console.log(tasks);
  return tasks;
};
