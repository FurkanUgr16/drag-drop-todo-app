import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/to-do/AppSidebar";
import TanstackProvider from "@/lib/providers/tanstack-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <SidebarProvider>
        <div className="relative flex h-screen w-full overflow-hidden bg-background">
          <AppSidebar />
          <SidebarTrigger />
          <main className="flex flex-1 flex-col w-full h-full p-4 overflow-hidden relative">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </TanstackProvider>
  );
}
