"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, List, Check, Trash, ListCheck, Sigma } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { getTasks } from "@/actions/getTasks";
import { newTask } from "@/actions/newTask";
import { deleteTask } from "@/actions/deleteTask";
import { Task } from "../../generated/prisma/client";
import { toast } from "sonner";

const Home = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

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
    try {
      if (task.length === 0 || !task) return;

      const newAddedTask = await newTask(task);

      if (!newAddedTask) return;

      setTask("");
      toast.success("Tarefa adicionada com sucesso!");
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
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

  useEffect(() => {
    handleGetTasks();
  }, []);

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
              <Plus />
              Cadastrar
            </Button>
          </CardHeader>

          <CardContent>
            <Separator className="mb-4" />

            <div className="flex gap-2">
              <Badge variant="default" className="cursor-pointer">
                <List /> Todas
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                <Check /> Não finalizadas
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                <Check /> Concluídas
              </Badge>
            </div>

            <div className="mt-4 border-b">
              {taskList.map((task) => (
                <div
                  className=" h-14 flex justify-between items-center border-t"
                  key={task.id}
                >
                  <div className="w-1 h-full bg-green-400"></div>
                  <p className="flex-1 px-2 text-sm">{task.title}</p>
                  <div className="flex items-center gap-2">
                    <EditTask />
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
                <p className="text-xs">Tarefas concluídas (3/3)</p>
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
