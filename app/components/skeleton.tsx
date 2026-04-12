"use-client"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonText() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-2 bg-grey-500 p-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
