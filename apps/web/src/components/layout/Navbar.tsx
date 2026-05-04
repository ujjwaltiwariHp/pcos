"use client";

import { useEffect, useState } from "react";
import { Bell, Search, Menu, UserCircle, LogOut, Shield, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/mode-toggle";

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle = pathname.split("/").filter(Boolean).pop() || "Dashboard";
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchApi('/auth/me');
        setUser(data.user);
      } catch (err) {
        // Silently fail or redirect if needed
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = "auth-bypass=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <header className="h-20 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-muted" onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-black capitalize tracking-tight hidden sm:block">
          {pageTitle}
        </h2>
      </div>

      {!pathname.startsWith('/admin') && user?.role !== 'admin' && (
        <div className="hidden md:flex items-center gap-6 flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search health records..." 
              className="pl-12 h-12 bg-muted/30 border-border/50 rounded-2xl focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 md:gap-4">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 pl-2 pr-2 md:pr-4 py-1.5 hover:bg-muted rounded-full transition-all outline-none group border border-transparent hover:border-border/50">
            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-black leading-none text-foreground/90">{user?.name || "Loading..."}</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase font-black tracking-widest">{user?.role || "User"} Account</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 glass-darker rounded-[2rem] border-border/50 p-2 shadow-2xl mt-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-black text-primary">
                {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-foreground text-lg">{user?.name}</h4>
                <p className="text-xs font-medium text-muted-foreground">{user?.email}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Active Status</span>
              </div>
            </div>
            
            <DropdownMenuSeparator className="bg-border/50 mx-2" />
            
            <div className="p-2 grid gap-1">
              <DropdownMenuItem className="rounded-xl py-3 px-4 gap-3 cursor-pointer hover:bg-muted focus:bg-muted transition-colors">
                <UserCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold">Profile Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-3 px-4 gap-3 cursor-pointer hover:bg-muted focus:bg-muted transition-colors">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold">Account Security</span>
              </DropdownMenuItem>
              <div className="px-4 py-2 mt-2">
                <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : "N/A"}
                </p>
              </div>
            </div>
            
            <DropdownMenuSeparator className="bg-border/50 mx-2" />
            
            <div className="p-2">
              <DropdownMenuItem 
                onClick={handleLogout}
                className="rounded-xl py-3 px-4 gap-3 cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-black uppercase tracking-widest">Sign Out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
