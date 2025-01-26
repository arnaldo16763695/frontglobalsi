import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b">
        <Skeleton className="h-16 w-full my-2" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="w-full p-2">
          <Skeleton className="h-8 w-[70%] md:w-[25%] mb-2 mt-4 " />
        </div>
        <div className="p-2">
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
          <Skeleton className="h-12 w-full my-0.5" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-8 w-20 my-0.5 mx-2 mb-4" />
          <Skeleton className="h-8 w-16 my-0.5 mx-2 mb-4" />

        </div>
      </div>
    </div>
  );
}
