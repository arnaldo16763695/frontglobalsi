"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: "ACTIVE" | "INAVTIVE" | "DELETE";
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "status",
    header: ()=>(
      <span className="hidden md:block">Status</span>
    ),
    cell: ({ row }) => {
      // Obtén el valor de "status" y aplícale toLowerCase()
      const status = row.getValue<string>("status").toLowerCase();
      return <span className="hidden md:block">{status}</span>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ()=>(
      <span className="hidden md:block">Teléfono</span>
    ),
    cell: ({row})=>(
      <span className="hidden md:block">{row.original.phone}</span>
    )
  },
  {
    accessorKey: "role",
    header: ()=>(
      <span className="hidden md:block">Rol</span>
    ),
    cell: ({row})=>(
      <span className="hidden md:block">{row.original.role}</span>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/users/${row.original.id}/edit`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/users/${row.original.id}/changepass`}>Cambiar contraseña</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
