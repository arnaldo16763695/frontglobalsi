"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressWork({ progress }: { progress: number }) {
  const [myProgress, setMyProgress] = React.useState(progress);

  React.useEffect(() => {
    const timer = setTimeout(() => setMyProgress(progress), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={myProgress} className="w-36" />;
}
