import React from "react";
import { Badge } from "./ui/badge";
import { Check, List } from "lucide-react";

export type FilterType = "all" | "pending" | "fineshed";

type FilterProps = {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) => {
  return (
    <div className="flex gap-2">
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "all" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("all")}
      >
        <List /> Todas
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "pending" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("pending")}
      >
        <Check /> Não finalizadas
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "fineshed" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("fineshed")}
      >
        <Check /> Concluídas
      </Badge>
    </div>
  );
};

export default Filter;
