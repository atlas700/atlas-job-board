import { Suspense } from "react"
import { SidebarUserButtonClient } from "./_SidebarUserButtonClient"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { LogOutIcon } from "lucide-react"
import { auth } from "@clerk/nextjs/server"
import { SignOutButton } from "@clerk/nextjs"

export function SidebarUserButton() {
  return (
    <Suspense>
      <SidebarUserSuspense />
    </Suspense>
  )
}

async function SidebarUserSuspense() {
  const { userId } = await auth()

  return <SidebarUserButtonClient user={{
    email: "tariq@gmail.com",
    name: "Tariq Atlas",
    imageUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
  }} />
}
