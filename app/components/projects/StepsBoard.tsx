"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { editStatusStepToWork } from "@/app/lib/orders-actions";
import { Move } from "lucide-react";

type Step = {
  id: string;
  description: string;
  status: "PENDING" | "FINISHED";
};
type Props = {
  initialPending: Step[];
  initialFinished: Step[];
  setProgress: (progress: number) => void;
};

function TaskCard({ id, title }: { id: string; title: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      className="rounded-lg bg-white shadow-sm border px-3 py-2 mb-2 select-none text-sm"
      style={{
        opacity: isDragging ? 0.6 : 1,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      <div className="flex items-center gap-2">
        {/* HANDLE: solo aquí aplicamos listeners/attributes */}
         <div
          {...listeners}
          {...attributes}
          role="button"
          tabIndex={0}
          // evita interferencias del navegador móvil:
          onContextMenu={(e) => e.preventDefault()}
          className="shrink-0 rounded p-1 cursor-grab active:cursor-grabbing"
          style={{
            touchAction: "none",          // imprescindible en handle
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
          }}
          aria-label="Arrastrar"
        >
          <Move />
        </div>
        <div className="min-w-0 break-words">{title}</div>
      </div>
    </div>
  );
}

function TaskColumn({
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
      className={`w-full dark:text-black min-h-48 border rounded-xl p-3 transition-colors ${
        isOver
          ? "border-blue-500 bg-blue-50"
          : "border-muted-foreground/20 bg-muted/30"
      }`}
    >
      <div className="font-semibold mb-2 dark:text-white">{title}</div>
      <div>{children}</div>
    </div>
  );
}

export default function StepsBoard({ initialPending, initialFinished, setProgress }: Props) {
  const [mounted, setMounted] = useState(false);
  const [pending, setPending] = useState<Step[]>(initialPending);
  const [finished, setFinished] = useState<Step[]>(initialFinished);
  
  useEffect(() => setMounted(true), []);

    useEffect(() => {
    const total = pending.length + finished.length;
    const pct = total === 0 ? 0 : Math.round((finished.length * 100) / total); // o con 1 decimal
    // const pct = total === 0 ? 0 : Math.round(((finished.length * 1000) / total)) / 10; // 1 decimal
    setProgress(pct);
  }, [pending.length, finished.length, setProgress]);


  const sensors = useSensors(
    // Requiere mover al menos 8px antes de activar drag (bueno para scroll)
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    // En móviles: requiere mantener 150ms + tolerancia leve antes de arrastrar
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    // (opcional) soporte de teclado
    useSensor(KeyboardSensor)
  );

  const pendingCards = useMemo(
    () =>
      pending.map((s) => (
        <TaskCard key={s.id} id={s.id} title={s.description} />
      )),
    [pending]
  );
  const finishedCards = useMemo(
    () =>
      finished.map((s) => (
        <TaskCard key={s.id} id={s.id} title={s.description} />
      )),
    [finished]
  );

  if (!mounted) return null;

  function moveStep(stepId: string, to: "pending" | "finished") {
    const found = [...pending, ...finished].find((s) => s.id === stepId);
    if (!found) return;

    const nextStatus: Step["status"] =
      to === "pending" ? "PENDING" : "FINISHED";

    const updated: Step = {
      ...found,
      status: nextStatus, // <- ahora es "PENDING" | "FINISHED" (no string)
    };

    setPending((p) => p.filter((s) => s.id !== stepId));
    setFinished((f) => f.filter((s) => s.id !== stepId));

    if (to === "pending") {
      setPending((p) => [updated, ...p]);
    } else {
      setFinished((f) => [updated, ...f]);
    }
  }

  async function persistStatus(stepId: string, to: "pending" | "finished") {
    await editStatusStepToWork({
      stepId,
      status: to === "pending" ? "PENDING" : "FINISHED",
    });   
    
  }

  async function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) return;
    const to = over.id as "pending" | "finished";
    const id = String(active.id);
    moveStep(id, to);
    try {
      await persistStatus(id, to);
    } catch (err) {
      console.error("Persist failed:", err);
      // opcional: revertir si quieres
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TaskColumn id="pending" title="Pendientes">
          {pendingCards}
        </TaskColumn>
        <TaskColumn id="finished" title="Finalizadas">
          {finishedCards}
        </TaskColumn>
      </div>
    </DndContext>
  );
}
