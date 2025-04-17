"use client";

import React from "react";
import { Steps } from "@/lib/types";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy, arrayMove
} from "@dnd-kit/sortable";
import ItemStepToWork from "./ItemStepToWork";
import { useState } from "react";

export const ListItemsDnD = ({ steps }: { steps: Steps[] }) => {
  const [Mysteps, setMySteps] = useState<Steps[]>(steps);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;  
    if (!over || active.id === over.id) return;
    setMySteps((steps)=>{
        const oldIndex = steps.findIndex((step) => step.id === active.id);
        const newIndex = steps.findIndex((step) => step.id === over.id);
        return arrayMove(steps, oldIndex, newIndex);
    })
    console.log(Mysteps) 
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={Mysteps} strategy={verticalListSortingStrategy}>
        {Mysteps.map((step) => (
          <ItemStepToWork step={step} key={step.id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
