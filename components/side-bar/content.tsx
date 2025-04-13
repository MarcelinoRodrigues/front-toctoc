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
      {/* Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" className="lg:hidden p-2 text-muted-foreground mb-3">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4 flex flex-col h-full bg-background">
          <SheetTitle className="text-xl font-semibold mb-6">Menu</SheetTitle>

          {/* Wrapper com grow para empurrar o botão pro fim */}
          <div className="flex flex-col h-full justify-between">
            <NavLinks onClick={() => setIsOpen(false)} handleLogout={handleLogout} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 p-4 bg-muted text-muted-foreground h-screen border-r border-border">
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
    <nav className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-1">
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
          <button
            onClick={() => setFinanceOpen(!financeOpen)}
            className={linkClass("justify-between")}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <span>Financeiro</span>
            </div>
            {financeOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {financeOpen && (
            <div className="ml-8 mt-2 flex flex-col gap-1">
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
          Configurações
        </SidebarLink>
      </div>

      {/* Botão de sair fixado no final */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full justify-center gap-3 py-3 text-white text-base font-semibold hover:bg-red-600"
        >
          <ArrowRightFromLine className="w-5 h-5" />
          Sair
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
    <Link
      href={href}
      onClick={onClick}
      className={linkClass()}
    >
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span className="truncate">{children}</span>
    </Link>
  )
}

const linkClass = (extra?: string) =>
  cn(
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition text-sm font-medium",
    "text-muted-foreground",
    extra
  )

export default Sidebar
