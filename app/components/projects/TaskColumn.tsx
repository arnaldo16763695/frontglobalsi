"use client";

import { useDroppable } from "@dnd-kit/core";
import React from "react";

export function TaskColumn({
  id,
  title,
  children,
}: {
  id: "pending" | "finished";
  title: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-full min-h-48 border rounded-xl p-3 transition-colors overflow-auto ${
        isOver ? "border-blue-500 bg-blue-50" : "border-muted-foreground/20 bg-muted/30"
      }`}
    >
      <div className="font-semibold mb-2">{title}</div>
      <div>{children}</div>
    </div>
  );
}
