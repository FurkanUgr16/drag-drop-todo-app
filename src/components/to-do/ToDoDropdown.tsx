import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { SidebarMenuAction } from "../ui/sidebar";

type DropdownProp = {
  projectId: string;
  onEdit: (id: string, isEditing: boolean) => void;
  onDelete: (id: string) => void;
};

const ToDoDropdown = ({ projectId, onEdit, onDelete }: DropdownProp) => {
  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    onEdit(projectId, true);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    onDelete(projectId);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={"right"} align={"center"}>
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil />
          <span>Change Name</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 />
          <span>Delete Task</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToDoDropdown;
