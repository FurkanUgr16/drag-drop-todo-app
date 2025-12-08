"use client";
import UseToDos from "@/hooks/use-todos";
import Columns from "@/components/to-do/Columns";
import { Column as ColumnType } from "@/types/type";

const DashboardPage = () => {
  const COLUMNS: ColumnType[] = [
    { id: "TO_DO", label: "To-Do" },
    { id: "IN_PROGRESS", label: "In Progress" },
    { id: "DONE", label: "Done" },
  ];
  const { todos, loading, addTodo, updateTodo, deletetTodo } = UseToDos();

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="p-4">
      <div className="flex justify-center items-center w-full gap-8">
        {COLUMNS.map((column) => (
          <Columns
            key={column.id}
            column={column}
            tasks={todos?.filter((task) => task.status === column.id) || []}
            addTodo={addTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
