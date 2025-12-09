import React from "react";
import { Plus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";

type ClickProps = {
  onClick: () => void;
};

const CreateTodo = ({ onClick }: ClickProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Başlangıç</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="cursor-pointer" onClick={onClick}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add Todo</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default CreateTodo;
