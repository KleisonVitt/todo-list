"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash, ListCheck, Sigma, LoaderCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditTask from "@/components/EditTask";
import { Task } from "../../generated/prisma/client";
import { getTasks } from "@/actions/getTasks";
import { newTask } from "@/actions/newTask";
import { deleteTask } from "@/actions/deleteTask";
import { updateTaskCompletion } from "@/actions/toggleTaskCompletion";
import { toast } from "sonner";
import Filter from "@/components/Filter";
import { FilterType } from "@/components/Filter";

const Home = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();

      if (!tasks) return;

      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (task.length === 0 || !task) {
        toast.error("Insira uam atividade!");
        setLoading(false);
        return;
      }

      const newAddedTask = await newTask(task);

      if (!newAddedTask) return;

      setTask("");
      toast.success("Tarefa adicionada com sucesso!");
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;

      const deletedTask = await deleteTask(id);

      if (!deletedTask) return;

      toast.warning("Tarefa deletada com sucesso!");
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTaskCompletion = async (taskId: string) => {
    const previousTasks = [...taskList];

    try {
      setTaskList((prev) => {
        const updatedTaskList = prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              completed: !task.completed,
            };
          } else {
            return task;
          }
        });
        return updatedTaskList;
      });

      await updateTaskCompletion(taskId);
    } catch (error) {
      setTaskList(previousTasks);
      throw error;
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList);
        break;
      case "pending":
        const pendingTasks = taskList.filter((task) => !task.completed);
        setFilteredTasks(pendingTasks);
        break;
      case "fineshed":
        const completedTasks = taskList.filter((task) => task.completed);
        setFilteredTasks(completedTasks);
        break;
    }
  }, [currentFilter, taskList]);

  return (
    <>
      <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
        <Card className="w-lg">
          <CardHeader className="flex gap-2">
            <Input
              placeholder="Adicioanr tarefa"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button className="cursor-pointer" onClick={handleAddTask}>
              {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
              Cadastrar
            </Button>
          </CardHeader>

          <CardContent>
            <Separator className="mb-4" />

            <Filter
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
            />

            <div className="mt-4 border-b">
              {taskList.length === 0 && (
                <p className="text-xs border-t py-4">
                  Nenhuma atividade cadastrada
                </p>
              )}
              {filteredTasks.map((task) => (
                <div
                  className=" h-14 flex justify-between items-center border-t"
                  key={task.id}
                >
                  <div
                    className={`${
                      task.completed
                        ? "w-1 h-full bg-green-400"
                        : "w-1 h-full bg-red-400"
                    }`}
                  ></div>
                  <p
                    className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <EditTask task={task} handleGetTasks={handleGetTasks} />
                    <Trash
                      size={16}
                      className="cursor-pointer"
                      onClick={() => handleDeleteTask(task.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex gap-2 items-center">
                <ListCheck size={16} />
                <p className="text-xs">Tarefas concluídas (3/3) </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-xs h-7 cursor-pointer"
                  >
                    <Trash /> Limpar tarefas concluídas
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja excluir xxx itens?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="h-2 w-full bg-gray-200 mt-4 rounded-md">
              <div
                className="h-full  bg-blue-500 rounded-md"
                style={{ width: "50%" }}
              ></div>
            </div>

            <div className="flex justify-end mt-4 text-xs items-center gap-2">
              <Sigma size={18} />
              <p>3 tarefas no total</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Home;
