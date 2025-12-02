"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { startsTechOrder } from "../lib/orders-actions";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export function SwitchInitProject({
  workId,
  isStartedWork,
}: {
  workId: string;
  isStartedWork: boolean | undefined;
}) {
  const router = useRouter();
  async function handleCheck() {
    if (confirm("seguro")) {
      const res = await startsTechOrder(workId);
      console.log(res, "<-----------");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
      className={`${isStartedWork && 'hidden'}`}
        id="airplane-mode"
        disabled={isStartedWork}
        onCheckedChange={handleCheck}
      />
      <Label htmlFor="airplane-mode" className={clsx('font-bold md:text-xl',{'text-yellow-600': isStartedWork && true})}>
        {isStartedWork ? "Orden iniciada" : "Iniciar orden"}
      </Label>    
    </div>
  );
}
