import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SignedOut } from "@/services/clerk/components/AuthStatus";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { AppSidebarClient } from "./_AppSidebarClient";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";

export default function HomePage() {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar className="overflow-hidden" collapsible="icon">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Atlas Jobs</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SignedOut>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/sign-in">
                        <LogInIcon />
                        <span>Sign In</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              </SignedOut>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarUserButton/>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">asmdksamdksamdksamdksamd</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
