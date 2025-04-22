"use client";

import React, { useState, useCallback } from "react";
import { Steps } from "@/lib/types";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import ItemStepToWork from "./ItemStepToWork";
import { Button } from "@/components/ui/button";

import { reorderSteps } from "@/app/lib/orders-actions"; // ⬅️ server action
import toast from "react-hot-toast";

interface ListItemsDnDProps {
  /** ID de la orden de trabajo — necesario para la llamada al backend */
  idWork: string;
  /** Lista de pasos en el orden actual */
  steps: Steps[];
  /** Setter del estado que vive en el componente padre */
  setSteps: React.Dispatch<React.SetStateAction<Steps[]>>;
}

export default function ListItemsDnD({
  idWork,
  steps,
  setSteps,
}: ListItemsDnDProps) {
  /* Flag que indica “hay cambios sin guardar” */
  const [dirty, setDirty] = useState(false);
  
  /* ────────── DnD: cuando termino de arrastrar ────────── */
  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;
      if (!over || active.id === over.id) return;

      /* Posiciones antiguas y nuevas */
      const oldIndex = steps.findIndex((s) => s.id === active.id);
      const newIndex = steps.findIndex((s) => s.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      /* Reordena el array in‑memory (UI optimista) */
      const reordered = arrayMove(steps, oldIndex, newIndex);
      setSteps(reordered);
      setDirty(true);
    },
    [steps, setSteps]
  );

  /* ────────── Guardar en el backend ────────── */
  const saveOrder = useCallback(async () => {
    const payload = steps.map((s, idx) => ({ id: s.id, order: idx }));   
    try {
      await reorderSteps(idWork, payload); // server action
      toast.success("Orden guardado");
      setDirty(false);
    } catch (err) {
      console.error(err);
      toast.error("No se pudo guardar el orden");
    }
  }, [steps, idWork]);

  return (
    <>
      {/* Botón flotante solo si hay cambios */}
      {dirty && (
        <Button
          onClick={saveOrder}
          className="fixed bottom-4 right-6 z-50 text-xs md:text-sm"
          variant="default"
        >
          Guardar orden
        </Button>
      )}

      {/* Zona de drag‑and‑drop */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={steps.map((s) => s.id)}                // solo IDs
          strategy={verticalListSortingStrategy}
        >
          {steps.map((step) => (
            <ItemStepToWork key={step.id} step={step} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}
