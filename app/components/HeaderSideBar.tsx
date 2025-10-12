'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Separator } from "@/components/ui/separator"
// import { ToggleTheme } from "@/components/ToggleTheme";
import {  SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link";

const HeaderSideBar = ({title, before, href}: {title: string, before: string, href: string}) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b">
    <div className="flex items-center gap-2 px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link href={href}>{before}</Link>          
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

    </div>
    {/* <div className="pr-4">
      <ToggleTheme />
    </div> */}
  </header>
  )
}

export default HeaderSideBar