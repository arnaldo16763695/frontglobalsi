"use client";
import * as React from "react";
import {
  AudioWaveform,
  // BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings,
  // Settings2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/app/components/users/NavUser";
// import { NavManagment } from "@/app/components/NavManagment";
import { NavMain } from "@/app/components/NavMain";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
// import { NavUserMobile } from "@/app/components/users/NavUserMobile";
import { NavTech } from "@/app/components/technician/NavTech";
// This is sample data.
import Image from "next/image";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Administración",
        url: "#",
        icon: Settings,
        isActive: pathName === "/users/list" || pathName === "/clients/list",
        items: [
          {
            title: "Usuarios",
            url: "/users/list",
          },
          {
            title: "Clientes",
            url: "/clients/list",
          },
          {
            title: "Empresas",
            url: "/companies/list",
          },
        ],
      },
      {
        title: "Proyectos",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Ordenes",
            url: "/projects/list",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      // {
      //   title: "Documentation",
      //   url: "#",
      //   icon: BookOpen,
      //   items: [
      //     {
      //       title: "Introduction",
      //       url: "#",
      //     },
      //     {
      //       title: "Get Started",
      //       url: "#",
      //     },
      //     {
      //       title: "Tutorials",
      //       url: "#",
      //     },
      //     {
      //       title: "Changelog",
      //       url: "#",
      //     },
      //   ],
      // },
      // {
      //   title: "Settings",
      //   url: "#",
      //   icon: Settings2,
      //   items: [
      //     {
      //       title: "General",
      //       url: "#",
      //     },
      //     {
      //       title: "Team",
      //       url: "#",
      //     },
      //     {
      //       title: "Billing",
      //       url: "#",
      //     },
      //     {
      //       title: "Limits",
      //       url: "#",
      //     },
      //   ],
      // },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
    technicianNav: [
      {
        title: "Proyectos",
        url: "#",
        icon: Settings,
        items: [
          {
            title: "Ordenes",
            url: "/projects/technicians/list",
          },
          {
            title: "Técnicos",
            url: "#",
          },
        ],
      },
    ],
  };

  const { data: session, status } = useSession();

  const user = {
    name: status === "authenticated" ? session?.user?.name || "Exmple" : "",
    email: status === "authenticated" ? session?.user?.email || "example" : "",
    avatar: "/avatar.png",
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild >
              <Link href="/dashboard" >
                <div className="flex aspect-square w-full items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  {/* <GalleryVerticalEnd className="size-4" /> */}
                  <Image className="dark:hidden" src="/images/logo.png" alt="Logo" width={90} height={90} />
                  <Image className="hidden dark:block" src="/images/logo_dark.png" alt="Logo" width={90} height={90} />
                </div>
                {/* <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Globalsi</span>
                </div> */}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* *********Menues*********  */}

        {session?.user?.role === "ADMIN" && <NavMain items={data.navMain} />}
        {session?.user?.role === "TECHNICIAN" && <NavTech items={data.technicianNav} />}


        {/* <NavManagment itemsManagment={data.projects} /> */}

        {/* *********Menues*********  */}
        {/* <NavUserMobile user={user} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
