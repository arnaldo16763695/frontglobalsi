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

import { Projects } from "@/lib/types";

export const columns: ColumnDef<Projects>[] = [

  {
    id: "progress",
    accessorKey: "progress",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Estatus
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue<"NOT_STARTED" | "IN_PROGRESS" | "FINISHED">(
        "progress"
      );

      switch (value) {
        case "NOT_STARTED":
          return (
            <span className="text-red-600 font-semibold">No Iniciada</span>
          );
        case "IN_PROGRESS":
          return (
            <span className="text-yellow-600 font-semibold">En Proceso</span>
          );
        case "FINISHED":
          return (
            <span className="text-green-600 font-semibold">Finalizada</span>
          );
        default:
          return <span className="text-muted-foreground">Desconocido</span>;
      }
    },
  },
  {
    accessorKey: "workCode",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}   
      >
        Codigo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "companyName",
    accessorFn: (row) => row.company?.companyName,
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
          className="hidden md:block"
        >
          Rut
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )   
    },
       cell: ({row})=>(
        <span className="hidden md:block">{row.original.company.rut}</span>
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
              <Link href={`/projects/${row.original.id}/edit`}>Editar</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
