import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, List, Check, SquarePen, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  return (
    <>
      <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
        <Card className="w-lg">
          <CardHeader className="flex gap-2">
            <Input placeholder="Adicioanr tarefa" />
            <Button className="cursor-pointer">
              <Plus />
              Cadastrar
            </Button>
          </CardHeader>

          <CardContent>
            <Separator className="mb-4" />

            <div className="flex gap-2">
              <Badge className="cursor-pointer">
                <List /> Todas
              </Badge>
              <Badge className="cursor-pointer">
                <Check /> Não finalizadas
              </Badge>
              <Badge className="cursor-pointer">
                <Check /> Concluídas
              </Badge>
            </div>

            <div className="mt-4 border-b">
              <div className=" h-14 flex justify-between items-center border-t">
                <div className="w-1 h-full bg-green-400"></div>
                <p className="flex-1 px-2 text-sm">Estudar ReactJS</p>
                <div className="flex items-center gap-2">
                  <SquarePen size={16} className="cursor-pointer" />
                  <Trash size={16} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Home;
