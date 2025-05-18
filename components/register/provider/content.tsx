// 'use client'

// import { useState, useTransition } from "react"
// import { getProducts } from "@/app/actions/products/getProducts"
// import { TableSkeleton } from "@/components/common/skeletonTable";
// import { CommonTable } from "@/components/table/table";

// interface Response {
//   providers: [];
//   hasNextPage: boolean;
// }

// export const Content = ({
//   initialData
// }: {
//   initialData: Response
// }) => {
//   const [isPending, startTransition] = useTransition()

//   const [data, setData] = useState(initialData)
//   const [page, setPage] = useState(1)
//   const [hasNextPage, setHasNextPage] = useState(true)
//   const [filters, setFilters] = useState<Record<string, string>>({})

//   const fetchPageData = (pageToLoad: number, appliedFilters = filters) => {
//     startTransition(() => {
//       getProducts({ ...appliedFilters, page: String(pageToLoad) }).then((res) => {
//         setData(res)
//         setHasNextPage(res.hasNextPage)
//         setPage(pageToLoad)
//       })
//     })
//   }

//   const handleFilterSubmit = (formData: FormData) => {
//     const newFilters: Record<string, string> = {}

//     const name = formData.get("name")?.toString()
//     const amount = formData.get("amount")?.toString()

//     if (amount) newFilters.amount = amount
//     if(name) newFilters.name = name

//     setFilters(newFilters)
//     fetchPageData(1, newFilters)
//   }

//   return (
//     <main className="w-full p-4">
//       {isPending ? (
//         <TableSkeleton />
//       ) : (
//         <CommonTable
//           data={data.providers ?? []}
//           fields={fields}
//           headers={headers}
//           formatValue={formatValue}
//           // renderCreate={() => (
//           //   <Create
//           //     onCreateSuccess={() => fetchPageData(1)}
//           //   />
//           // )}
//           // renderFilters={() => (
//           //   <FilterProductDialog onSubmit={handleFilterSubmit} />
//           // )}
//           currentPage={page ?? 1}
//           onPageChange={(newPage) => fetchPageData(newPage)}
//           hasNextPage={hasNextPage}
//         />
//       )}
//     </main>
//   )
// }