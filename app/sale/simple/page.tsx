import { Content } from "@/components/sale/simple/content"
import Sidebar from "@/components/side-bar/content"

export default function Simple() {
    return (
        <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
            <Sidebar />
            <Content />
        </div>
    )
}