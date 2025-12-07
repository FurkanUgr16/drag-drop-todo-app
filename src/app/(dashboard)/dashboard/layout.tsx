import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/to-do/AppSidebar";
import TanstackProvider from "@/lib/providers/tanstack-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </TanstackProvider>
  );
}
