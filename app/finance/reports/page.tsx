import { getReport } from "@/app/actions/reports/getReport";
import { Content } from "@/components/finance/reports/content";
import Sidebar from "@/components/side-bar/content";

export default async function Reports() {
  const report = await getReport({})

  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Sidebar />
      <Content initialReport={report} />
    </div>
  )
}