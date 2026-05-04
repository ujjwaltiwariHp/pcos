"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ClipboardCheck, FileText, User, LogOut, HeartPulse, ShieldCheck, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

const userNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Assessment", href: "/assessment", icon: ClipboardCheck },
  { name: "Results", href: "/results", icon: FileText },
  { name: "Profile", href: "/profile", icon: User },
];

const adminNavItems = [
  { name: "Admin Stats", href: "/admin/dashboard", icon: BarChart3 },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "All Assessments", href: "/admin/assessments", icon: FileText },
  { name: "Take Assessment", href: "/assessment", icon: ClipboardCheck },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith("/admin");
  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
      localStorage.removeItem('token');
      document.cookie = "auth-bypass=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border w-64 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <HeartPulse className="text-primary-foreground w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight">PCOS AI</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            {isAdmin ? "Admin Panel" : "Health Assistant"}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-accent-foreground")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-sidebar-border space-y-2">
        {isAdmin ? (
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-[10px] uppercase font-black tracking-widest text-muted-foreground/40 hover:text-primary hover:bg-primary/5 transition-all duration-200">
               <LayoutDashboard className="w-4 h-4" />
               Switch to User View
            </Button>
          </Link>
        ) : (
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-[10px] uppercase font-black tracking-widest text-muted-foreground/40 hover:text-primary hover:bg-primary/5 transition-all duration-200">
               <ShieldCheck className="w-4 h-4" />
               Switch to Admin
            </Button>
          </Link>
        )}
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 px-4 py-6 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
}
