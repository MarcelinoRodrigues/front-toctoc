"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Home, Package, Menu, Settings, DollarSign, Boxes, TrendingUp, ArrowRightFromLine, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("token")
        requestAnimationFrame(() => {
            router.replace("/login");
          });
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

const NavLinks = ({ onClick, handleLogout }: { onClick?: () => void, handleLogout: () => void }) => {
    const [financeOpen, setFinanceOpen] = useState(false)

    return (
        <nav className="flex flex-col h-full">
            <div className="flex flex-col space-y-4">
                <Link href="/dashboard" onClick={onClick} className={linkClass()}>
                    <Home className="w-5 h-5" /> Dashboard
                </Link>
                <Link href="/products" onClick={onClick} className={linkClass()}>
                    <Package className="w-5 h-5" /> Produtos
                </Link>
                <Link href="/sale" onClick={onClick} className={linkClass()}>
                    <Package className="w-5 h-5" /> Vendas
                </Link>
                <Link href="/stock" onClick={onClick} className={linkClass()}>
                    <Boxes className="w-5 h-5" /> Estoque
                </Link>
                
                <div className="flex flex-col">
                    <button onClick={() => setFinanceOpen(!financeOpen)} className={linkClass()}>
                        <TrendingUp className="w-5 h-5" /> Financeiro
                        {financeOpen ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
                    </button>
                    {financeOpen && (
                        <div className="ml-6 flex flex-col space-y-2">
                            <Link href="/finance/reports" onClick={onClick} className={linkClass()}>
                                Relatórios
                            </Link>
                            <Link href="/finance/entries" onClick={onClick} className={linkClass()}>
                                Lançamentos
                            </Link>
                        </div>
                    )}
                </div>
                
                <Link href="/settings" onClick={onClick} className={linkClass()}>
                    <Settings className="w-5 h-5" /> Configuração
                </Link>
            </div>

            <div className="mt-auto">
                <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 cursor-pointer">
                    Sair<ArrowRightFromLine />
                </Button>
            </div>
        </nav>
    )
}

const linkClass = () => cn("flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition hover:text-white")

export default Sidebar
