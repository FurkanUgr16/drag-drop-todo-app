import { Column as ColumnTyPe, Tasks } from "@/types/type";

import ToDoCards from "./ToDoCards";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type ColumnProps = {
  column: ColumnTyPe;
  tasks: Tasks[];
  addTodo: () => void;
};

const Columns = ({ column, tasks, addTodo }: ColumnProps) => {
  return (
    <div className="flex h-full w-80 min-w-[20rem] flex-col rounded-xl bg-background/20 border border-border p-2">
      <h1 className=" p-4 font-semibold text-lg">{column.label}</h1>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id}>
            <ToDoCards tasks={task} />
          </div>
        ))}
      </div>
      <div className="p-4 mt-auto">
        <Button className="w-full" onClick={addTodo} variant={"ghost"}>
          <div className="flex items-center space-x-2">
            <Plus size={16} />
            <span>Add Todo</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Columns;
