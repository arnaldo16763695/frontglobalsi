import { cookies } from "next/headers"
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
