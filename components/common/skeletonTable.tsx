import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

const HEADERS = Array(6).fill("")

export function SaleTableSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-1 h-[31rem]">
      <div className="overflow-x-auto flex-grow">
        <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <TableHeader className="bg-gray-100 text-gray-700 uppercase text-sm">
            <TableRow>
              {HEADERS.map((_, index) => (
                <TableHead key={index} className="p-3 border-b text-center">
                  <Skeleton className="h-4 w-20 mx-auto" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {Array.from({ length: 6 }).map((_, rowIdx) => (
              <TableRow key={rowIdx} className="border-b">
                {HEADERS.map((_, colIdx) => (
                  <TableCell key={colIdx} className="p-3 text-center">
                    <Skeleton className="h-4 w-full mx-auto" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
