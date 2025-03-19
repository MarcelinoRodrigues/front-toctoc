"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Home, Package, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className="flex">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="hover:cursor-pointer lg:hidden">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-4 flex flex-col h-full" iconBackground="hover:cursor-pointer hover:text-red-500">
                    <SheetTitle>Menu</SheetTitle>
                    <NavLinks onClick={() => setIsOpen(false)} handleLogout={handleLogout} />
                </SheetContent>
            </Sheet>

            <aside className="hidden lg:flex lg:flex-col w-64 p-4 bg-gray-900 text-white h-screen">
                <NavLinks handleLogout={handleLogout} />
            </aside>
        </div>
    );
};

const NavLinks = ({ onClick, handleLogout }: { onClick?: () => void; handleLogout: () => void }) => (
    <nav className="flex flex-col h-full">
        <div className="flex flex-col space-y-4">
            <Link href="/dashboard" onClick={onClick} className={linkClass()}>
                <Home className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/products" onClick={onClick} className={linkClass()}>
                <Package className="w-5 h-5" /> Produtos
            </Link>
        </div>

        <div className="mt-auto">
            <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 cursor-pointer">
                Sair
            </Button>
        </div>
    </nav>
);

const linkClass = () => cn("flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition hover:text-white");

export default Sidebar;
