import { TableSkeleton } from "./skeletonTable";

export default function ContentLoading() {
  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <main className="w-full p-4">
        <TableSkeleton />
      </main>
    </div>
  )
}