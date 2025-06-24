import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarNavMenuGroup } from "@/components/sidebar/SidebarNavMenuGroup";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";
import { BrainCircuitIcon, ClipboardIcon, LayoutDashboardIcon } from "lucide-react";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppSidebar
      content={
        <SidebarNavMenuGroup
        className="mt-auto"
          items={[
            {
              href: "/",
              label: "Job Board",
              icon: <ClipboardIcon />,
            },
            {
              href: "/ai-search",
              label: "AI Search",
              icon: <BrainCircuitIcon />,
            },
            {
              href: "/employer",
              label: "Employer Dashboard",
              icon: <LayoutDashboardIcon />,
            },
          ]}
        />
      }
      footerContent={<SidebarUserButton />}
    >
      <main className="flex-1">{children}</main>
    </AppSidebar>
  );
}
