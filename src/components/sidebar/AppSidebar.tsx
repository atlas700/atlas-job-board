import { SignedIn } from "@/services/clerk/components/AuthStatus";
import type { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "../ui/sidebar";
import { AppSidebarClient } from "./_AppSidebarClient";

export function AppSidebar({
  children,
  content,
  footerContent,
}: {
  content: ReactNode;
  footerContent: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar className="overflow-hidden" collapsible="icon">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Atlas Jobs</span>
          </SidebarHeader>
          <SidebarContent>
            {content}
          </SidebarContent>
          <SignedIn>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  {footerContent}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SignedIn>
        </Sidebar>
        <main className="flex-1">{children}</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
