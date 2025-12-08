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
    <div className="flex w-80 flex-col rounded-xl bg-background/20 p-4 border h-full max-h-screen">
      <h1 className=" p-4 font-semibold text-lg">{column.label}</h1>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {tasks.map((task) => (
          <>
            <ToDoCards key={task.id} tasks={task} />
          </>
        ))}
      </div>
      <div className="mt-4">
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
