import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function HomePage() {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <Sidebar className="overflow-hidden" collapsible="icon">
        <SidebarHeader className="flex-row">
          <SidebarTrigger />
          <span className="text-xl text-nowrap">Atlas Jobs</span>
        </SidebarHeader>
      </Sidebar>
    </SidebarProvider>
  );
}
