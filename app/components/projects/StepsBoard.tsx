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
import { Steps } from "@/lib/types";
import FormEditStepToWork from "./FormEditStepToWork";

type Props = {
  pending: Steps[];
  finished: Steps[];
  setPending: React.Dispatch<React.SetStateAction<Steps[]>>;
  setFinished: React.Dispatch<React.SetStateAction<Steps[]>>;
  setProgress: (progress: number) => void;
  projectId: string;
};

function TaskCard({
  id,
  title,
  userName,
  status,
  userId,
  email,
  worksId,
  onStepUpdated,
}: {
  id: string;
  title: string;
  userName: string;
  status: string;
  userId: string;
  email: string;
  worksId: string;
  onStepUpdated: (updated: Steps) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      className="rounded-lg bg-slate-400 dark:bg-slate-600 border px-3 py-2 mb-2 select-none text-sm"
      style={{
        opacity: isDragging ? 0.6 : 1,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          {...listeners}
          {...attributes}
          role="button"
          tabIndex={0}
          onContextMenu={(e) => e.preventDefault()}
          className="shrink-0 rounded p-1 cursor-grab active:cursor-grabbing w-[5%]"
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
          }}
          aria-label="Arrastrar"
        >
          <Move />
        </div>
        <div className="min-w-0 break-words  dark:text-white w-[90%] pl-2">
          {title}
        </div>
        <FormEditStepToWork
          step={{
            id,
            description: title,
            status: status === "PENDING" ? "PENDING" : "FINISHED",
            worksId,
            user: {
              id: userId,
              name: userName,
              email,
            },
          }}
          onUpdated={onStepUpdated}
        />
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

export default function StepsBoard({
  pending,
  finished,
  setPending,
  setFinished,
  setProgress,
  projectId,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // recalcula el % de progreso cuando cambian las listas
  useEffect(() => {
    const total = pending.length + finished.length;
    const pct = total === 0 ? 0 : Math.round((finished.length * 100) / total);
    setProgress(pct);
  }, [pending.length, finished.length, setProgress]);

  const handleStepUpdated = (updated: Steps) => {
    setPending((prev) => {
      const others = prev.filter((s) => s.id !== updated.id);
      return updated.status === "PENDING" ? [updated, ...others] : others;
    });

    setFinished((prev) => {
      const others = prev.filter((s) => s.id !== updated.id);
      return updated.status === "FINISHED" ? [updated, ...others] : others;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const pendingCards = useMemo(
    () =>
      pending.map((s) => (
        <TaskCard
          key={s.id}
          id={s.id}
          title={s.description}
          userName={s.user.name}
          status="PENDING"
          worksId={s.worksId}
          userId={s.user.id}
          email={s.user.email}
          onStepUpdated={handleStepUpdated}
        />
      )),
    [pending]
  );

  const finishedCards = useMemo(
    () =>
      finished.map((s) => (
        <TaskCard
          key={s.id}
          id={s.id}
          title={s.description}
          userName={s.user.name}
          status="FINISHED"
          worksId={s.worksId}
          email={s.user.email}
          userId={s.user.id}
          onStepUpdated={handleStepUpdated}
        />
      )),
    [finished]
  );

  if (!mounted) return null;

  function moveStep(stepId: string, to: "pending" | "finished") {
    const found = [...pending, ...finished].find((s) => s.id === stepId);
    if (!found) return;

    const nextStatus: Steps["status"] =
      to === "pending" ? "PENDING" : "FINISHED";

    const updated: Steps = {
      ...found,
      status: nextStatus,
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
      worksId: projectId,
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
