"use client";
import { Card, CardTitle, CardHeader } from "../ui/card";
import { Tasks } from "@/types/type";
import { useDraggable } from "@dnd-kit/core";
import ToDoDropdown from "./ToDoDropdown";
type TodoCardProp = {
  tasks: Tasks;
};

const ToDoCards = ({ tasks }: TodoCardProp) => {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: tasks.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Card
      className="cursor-grabbing"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <CardHeader>
        <CardTitle>{tasks.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ToDoCards;
