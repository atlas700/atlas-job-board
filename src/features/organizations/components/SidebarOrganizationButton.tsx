import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";
import { Suspense } from "react";
import { SidebarUserButtonClient } from "./_SidebarUserButtonClient";
import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";

export function SidebarUserButton() {
  return (
    <Suspense>
      <SidebarUserSuspense />
    </Suspense>
  );
}

async function SidebarUserSuspense() {
  const { user } = await getCurrentUser({ allData: true });

  if (user == undefined) {
    return (
      <SignOutButton>
        <SidebarMenuButton>
          <LogOutIcon />
          <span>Log Out</span>
        </SidebarMenuButton>
      </SignOutButton>
    );
  }

  return (
    <SidebarUserButtonClient
      user={{
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
      }}
    />
  );
}
