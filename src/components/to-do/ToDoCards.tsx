import { Card, CardTitle, CardHeader } from "../ui/card";
import { Tasks } from "@/types/type";

type TodoCardProp = {
  tasks: Tasks;
};

const ToDoCards = ({ tasks }: TodoCardProp) => {
  return (
    <Card className="bg-background/20">
      <CardHeader>
        <CardTitle>{tasks.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ToDoCards;
