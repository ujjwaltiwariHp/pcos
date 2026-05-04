import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { StarryBackground } from "@/components/ui/starry-background";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="relative h-screen w-screen bg-[#06070B] text-white overflow-hidden selection:bg-primary/30">
      <StarryBackground />
      
      {/* Glow Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-10 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-2xl shadow-primary/40">
            <HeartPulse className="text-primary-foreground w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">PCOS AI</span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Health Assistant</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {token ? (
            <Link href="/dashboard">
              <Button className="rounded-xl px-6 h-10 bg-white text-black hover:bg-primary hover:text-white font-bold text-[10px] uppercase tracking-widest transition-all">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="rounded-xl px-6 h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Main Hero - Compact */}
      <main className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3 h-3" />
          Clinical-Grade AI Diagnostics
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] mb-6 max-w-3xl">
          Precision PCOS <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">Monitoring.</span>
        </h1>
        
        <p className="max-w-md text-xs md:text-sm text-muted-foreground font-medium leading-relaxed mb-8">
          Advanced neural networks for early detection and personalized hormonal health management. Professional insights, simplified for you.
        </p>
        
        <div className="flex items-center gap-4">
          <Link href={token ? "/dashboard" : "/register"}>
            <Button size="lg" className="rounded-2xl px-10 h-16 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 gap-3 group">
              Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Minimal Footer Info */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
          <span>Neural Engine v4.0</span>
          <span>•</span>
          <span>Encrypted Data</span>
          <span>•</span>
          <span>Clinical Datasets</span>
        </div>
      </main>
    </div>
  );
}
