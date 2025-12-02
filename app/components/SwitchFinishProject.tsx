"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { finishTechOrder } from "../lib/orders-actions";

export function SwitchFinishProject({ workId }: { workId: string }) {
  const router = useRouter();
  async function handleCheck() {
    if (confirm('Seguro?')) {
      await finishTechOrder(workId);
      router.refresh();
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" onCheckedChange={handleCheck} />
      <Label htmlFor="airplane-mode">Finalizar orden</Label>
    </div>
  );
}
