import { Content } from "@/components/dashboard/content";
import Sidebar from "@/components/side-bar/content";

export default function Dashboard() {
    return (
        <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
            <Sidebar />
            <Content />
        </div>
    )
}