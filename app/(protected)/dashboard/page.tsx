import Dashboard from "@/app/components/Dashboard";
import DashboardTech from "@/app/components/DashboardTech";
import HeaderSideBar from "@/app/components/HeaderSideBar";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Home() {
  const session = await auth();
  return (
    <>
      <HeaderSideBar before="Inicio" title="Dashboard" href="/dashboard" />
      {session && session.user.role === "ADMIN" && <Dashboard />}
      {session && session.user.role === "TECHNICIAN" && <DashboardTech />}
    </>
  );
}
