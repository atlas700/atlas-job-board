import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";
import { SignedOut } from "@/services/clerk/components/AuthStatus";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppSidebar
      content={
        <SidebarGroup>
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
        </SidebarGroup>
      }
      footerContent={<SidebarUserButton />}
    >
      <main className="flex-1">{children}</main>
    </AppSidebar>
  );
}
