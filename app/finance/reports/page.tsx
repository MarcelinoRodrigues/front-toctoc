import { getReport } from "@/app/actions/reports/getReport";
import { Content } from "@/components/finance/reports/content";

export default async function Reports() {
  const report = await getReport({ reportDay: new Date().toISOString().split('T')[0], type: '0' });

  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Content initialReport={report} />
    </div>
  )
}