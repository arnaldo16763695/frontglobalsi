"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 type Projects = {
  id: string;
  rut: string;  
  companyId: string;  
  company:{
    companyName:string;
    rut:string;
  };
  progress: "NOT_STARTED" | "FINISHED" | "NOT_STARTED";
  status: "ACTIVE" | "INAVTIVE" | "DELETE";
};

export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      // Obtén el valor de "status" y aplícale toLowerCase()
      const status = row.getValue<string>("status").toLowerCase();
      return <div>{status}</div>;
    },
  },
  {
    id: "companyName",
    accessorFn: row => row.company?.companyName,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Empresa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "company.rut",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rut
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
              <Link href={`/projects/${row.original.id}/edit`}>Editar</Link>
            </DropdownMenuItem>           
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
