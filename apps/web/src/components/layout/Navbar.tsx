"use client";

import { Bell, Search, Menu, UserCircle } from "lucide-react";
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
import { usePathname } from "next/navigation";

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const pageTitle = pathname.split("/").filter(Boolean).pop() || "Dashboard";

  return (
    <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold capitalize tracking-tight">
          {pageTitle}
        </h2>
      </div>

      <div className="hidden md:flex items-center gap-6 flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search health records..." 
            className="pl-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative hover:bg-muted/50 rounded-full">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="gap-3 pl-2 pr-4 py-2 hover:bg-muted/50 rounded-full transition-all">
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <UserCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold leading-none">Ujjwal Tiwari</p>
                <p className="text-[11px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Premium User</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-primary/10">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-primary/10">Health History</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-primary/10">Subscriptions</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
