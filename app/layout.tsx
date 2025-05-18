"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/side-bar/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login" && pathname !== "/" && pathname !== "/user";

  return (
    <html lang="en" className="w-screen h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-400 h-screen w-screen`}
      >
        <div className={`${showSidebar ? "h-screen w-screen p-4 lg:p-0 lg:flex" : ""}`}>
          {showSidebar && <Sidebar />}
          {children}
        </div>
      </body>
    </html>
  );
}
