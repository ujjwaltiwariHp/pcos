import { StarryBackground } from "@/components/ui/starry-background";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col items-center justify-center overflow-hidden">
      {/* Premium Gradient Background (handled by theme or starry-bg) */}
      <StarryBackground />
      
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        <Link href="/" className="flex flex-col items-center gap-4 mb-12 group">
          <div className="w-16 h-16 bg-primary rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_-12px_rgba(var(--primary),0.5)] group-hover:rotate-12 transition-all duration-700">
            <HeartPulse className="text-primary-foreground w-10 h-10" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black tracking-tighter leading-none mb-1">PCOS AI</span>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/80">Diagnostic Systems</span>
          </div>
        </Link>
        
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
          {children}
        </div>
      </div>
      
      <div className="absolute bottom-8 z-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
        © 2026 PCOS AI Health. Protected Session.
      </div>
    </div>
  );
}
