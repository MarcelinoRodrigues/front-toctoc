import { Content } from "@/components/dashboard/content";
import Sidebar from "@/components/side-bar/content";
import { getDashboard } from "@/services/dashboard/getDashboard";

export default async function Dashboard() {
    const dashboardData = await getDashboard();

    return (
        <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
            <Sidebar />
            <Content dashboard={dashboardData} />
        </div>
    );
}
