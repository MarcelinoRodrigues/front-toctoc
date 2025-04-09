"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Home,
  Package,
  DollarSign,
  Menu,
  Settings,
  Boxes,
  TrendingUp,
  ArrowRightFromLine,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    requestAnimationFrame(() => {
      router.replace("/login")
    })
  }

  return (
    <div className="flex">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="hover:cursor-pointer lg:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4 flex flex-col h-full">
          <SheetTitle>Menu</SheetTitle>
          <NavLinks onClick={() => setIsOpen(false)} handleLogout={handleLogout} />
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex lg:flex-col w-64 p-4 bg-gray-900 text-white h-screen">
        <NavLinks handleLogout={handleLogout} />
      </aside>
    </div>
  )
}

const NavLinks = ({
  onClick,
  handleLogout,
}: {
  onClick?: () => void
  handleLogout: () => void
}) => {
  const [financeOpen, setFinanceOpen] = useState(false)

  return (
    <nav className="flex flex-col h-full">
      <div className="flex flex-col space-y-4">
        <SidebarLink href="/dashboard" icon={<Home className="w-5 h-5" />} onClick={onClick}>
          Dashboard
        </SidebarLink>

        <SidebarLink href="/products" icon={<Package className="w-5 h-5" />} onClick={onClick}>
          Produtos
        </SidebarLink>

        <SidebarLink href="/sale" icon={<DollarSign className="w-5 h-5" />} onClick={onClick}>
          Vendas
        </SidebarLink>

        <SidebarLink href="/stock" icon={<Boxes className="w-5 h-5" />} onClick={onClick}>
          Estoque
        </SidebarLink>

        <div className="flex flex-col">
          <button onClick={() => setFinanceOpen(!financeOpen)} className={linkClass()}>
            <TrendingUp className="w-5 h-5" />
            Financeiro
            {financeOpen ? (
              <ChevronUp className="w-4 h-4 ml-auto" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-auto" />
            )}
          </button>
          {financeOpen && (
            <div className="ml-6 flex flex-col space-y-2">
              <SidebarLink href="/finance/reports" onClick={onClick}>
                Relatórios
              </SidebarLink>
              <SidebarLink href="/finance/entries" onClick={onClick}>
                Lançamentos
              </SidebarLink>
            </div>
          )}
        </div>

        <SidebarLink href="/settings" icon={<Settings className="w-5 h-5" />} onClick={onClick}>
          Configuração
        </SidebarLink>
      </div>

      <div className="mt-auto">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 cursor-pointer"
        >
          Sair <ArrowRightFromLine className="ml-2" />
        </Button>
      </div>
    </nav>
  )
}

const SidebarLink = ({
  href,
  icon,
  children,
  onClick,
}: {
  href: string
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <Link href={href} onClick={onClick} className={linkClass()}>
      {icon}
      {children}
    </Link>
  )
}

const linkClass = () =>
  cn(
    "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition hover:text-white"
  )

export default Sidebar
