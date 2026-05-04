"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

import { StarryBackground } from "@/components/ui/starry-background";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
        const data = await res.json();
        if (!res.ok || data.user.role !== 'admin') {
          toast.error("Unauthorized: Admin access required");
          router.push('/dashboard');
          return;
        }
        setIsVerifying(false);
      } catch (error) {
        router.push('/login');
      }
    };
    checkAdmin();
  }, [router]);

  if (isVerifying) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#06070B]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Verifying Credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#06070B] text-white relative">
      <StarryBackground />
      
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-shrink-0 relative z-50">
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
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
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
