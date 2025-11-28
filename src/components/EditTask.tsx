import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Task } from "../../generated/prisma/client";
import { toast } from "sonner";
import { editTask } from "@/actions/editTask";

type TaskProps = {
  task: Task;
  handleGetTasks: () => void;
};

const EditTask = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task.title);

  const handleEditTask = async () => {
    try {
      if (editedTask !== task.title) {
        toast.success("Tarefa alterada com sucesso!");
      } else {
        toast.error("Título da tarefa não alterada!");
        return;
      }

      await editTask({
        taskId: task.id,
        taskTitle: editedTask,
      });
      handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>Editar tarefa</p>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Editar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
