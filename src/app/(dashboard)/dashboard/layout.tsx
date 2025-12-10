"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/to-do/AppSidebar";
import TanstackProvider from "@/lib/providers/tanstack-provider";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Tasks } from "@/types/type";
import UseToDos from "@/hooks/use-todos";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { updateToDoStatus } = UseToDos();
  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Tasks["status"];

    updateToDoStatus(taskId, newStatus);
  };
  return (
    <DndContext onDragEnd={handleDragEvent}>
      <SidebarProvider>
        <div className="relative flex h-screen w-full overflow-hidden bg-background">
          <AppSidebar />
          <SidebarTrigger />
          <main className="flex flex-1 flex-col w-full h-full p-4 overflow-hidden relative">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </DndContext>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <LayoutContent> {children} </LayoutContent>
    </TanstackProvider>
  );
}
