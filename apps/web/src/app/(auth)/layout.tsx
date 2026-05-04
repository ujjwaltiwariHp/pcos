import { StarryBackground } from "@/components/ui/starry-background";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06070B] text-white relative flex flex-col items-center justify-center overflow-hidden">
      <StarryBackground />
      
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-3 mb-12 group">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-transform duration-500">
            <HeartPulse className="text-primary-foreground w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none">PCOS AI</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Health Assistant</span>
          </div>
        </Link>
        
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {children}
        </div>
      </div>
      
      <div className="relative z-10 mt-auto py-8 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
        © 2026 PCOS AI Health. Secure Access Portal.
      </div>
    </div>
  );
}
