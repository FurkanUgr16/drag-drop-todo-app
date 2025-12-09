"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import CreateTodo from "./CreateToDo";
import UseToDos from "@/hooks/use-todos";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import ToDoCards from "./ToDoCards";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import ToDoDropdown from "./ToDoDropdown";

export function AppSidebar() {
  const { addTodo, todos, toggleEditMode, updateToDoName, deleteTodo } =
    UseToDos();
  const { user } = useUser();

  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.key === "Enter") {
      toggleEditMode(id, false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="my-2 mx-1">
        <Link href={"/"}>To-Do App</Link>
      </SidebarHeader>
      <SidebarContent>
        {todos.length === 0 ? (
          <CreateTodo onClick={() => addTodo("NULL")} />
        ) : (
          <>
            <SidebarGroup>
              <div className="flex flex-col pr-2">
                <SidebarGroupLabel>Tasks</SidebarGroupLabel>
                <Button
                  className="flex justify-center items-center w-full mb-4"
                  onClick={() => addTodo("NULL")}
                  title="New Task"
                  variant={"ghost"}
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-center my-auto">Add New Task</span>
                </Button>
              </div>

              <SidebarGroupContent>
                <SidebarMenu>
                  {todos
                    .filter((todo) => todo.status === "NULL")
                    .map((todo) => (
                      <SidebarMenuItem key={todo.id}>
                        {todo.isEditing ? (
                          <Input
                            value={todo.name}
                            onChange={(event) =>
                              updateToDoName(todo.id, event.target.value)
                            }
                            onBlur={() => toggleEditMode(todo.id, false)}
                            onKeyDown={(e) => handleKeyDown(e, todo.id)}
                          />
                        ) : (
                          <>
                            <ToDoCards tasks={todo} />
                            {!todo.isEditing && (
                              <ToDoDropdown
                                projectId={todo.id}
                                onEdit={toggleEditMode}
                                onDelete={deleteTodo}
                              />
                            )}
                          </>
                        )}
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-evenly items-center mt-auto">
          <UserButton />
          <p className="text-sm">{user?.emailAddresses[0].emailAddress}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
