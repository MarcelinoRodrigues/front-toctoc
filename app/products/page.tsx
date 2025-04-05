"use client"

import Sidebar from "@/components/side-bar/content"
import Content from "@/components/products/content"

export default function ProductsPage() {
  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Sidebar />
      <Content />
    </div>
  )
}
