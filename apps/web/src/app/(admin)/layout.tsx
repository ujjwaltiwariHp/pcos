"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Sidebar - Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "bg-black/60 opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 lg:hidden transform transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-2">
              <Badge className="bg-primary/20 text-primary border-primary/20 uppercase font-black px-3 py-1 text-[10px] tracking-widest">
                Admin Console
              </Badge>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
