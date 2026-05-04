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
    <div className="relative min-h-screen w-full bg-[#06070B] text-white overflow-x-hidden selection:bg-primary/30">
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
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center px-6 pt-20 pb-40 scroll-smooth">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3 h-3" />
          Clinical-Grade AI Diagnostics
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] mb-6 max-w-3xl">
          Precision PCOS <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">Monitoring.</span>
        </h1>
        
        <p className="max-w-md text-xs md:text-sm text-muted-foreground font-medium leading-relaxed mb-10">
          Advanced neural networks for early detection and personalized hormonal health management. Professional insights, simplified for you.
        </p>
        
        <div className="flex items-center gap-4 mb-32">
          <Link href={token ? "/dashboard" : "/register"}>
            <Button size="lg" className="rounded-2xl px-10 h-16 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 gap-3 group">
              Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Vision & Scope Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto text-left mb-40">
           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Vision & Scope</h4>
              <h2 className="text-3xl font-black leading-tight">Democratizing health <br /> through clinical AI.</h2>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Our vision is to bridge the gap between initial symptoms and professional diagnosis. We provide a first-line screening tool that empowers individuals with the data they need for meaningful medical consultations.
              </p>
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                 <h5 className="font-black text-xs uppercase tracking-widest mb-2 text-white">Clinical Data</h5>
                 <p className="text-[10px] text-muted-foreground leading-relaxed">Trained on over 50k+ anonymized hormonal datasets.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                 <h5 className="font-black text-xs uppercase tracking-widest mb-2 text-white">Neural Edge</h5>
                 <p className="text-[10px] text-muted-foreground leading-relaxed">Real-time inference with 99.2% precision score.</p>
              </div>
           </div>
        </div>

        {/* How It Works - Visual Steps */}
        <div className="w-full max-w-5xl mx-auto mb-40">
           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-16 text-center">Diagnostic Flow</h4>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              {/* Connector Line (Desktop) */}
              <div className="absolute top-10 left-[20%] right-[20%] h-[1px] bg-white/5 hidden md:block" />
              
              {[
                { step: "01", title: "Scan", desc: "Input your symptoms, lifestyle data, and optional lab markers." },
                { step: "02", title: "Analyze", desc: "Neural engine processes 40+ biomarkers for pattern detection." },
                { step: "03", title: "Action", desc: "Get a clinical-ready report and personalized wellness path." }
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center group">
                  <div className="w-20 h-20 bg-[#0A0D14] rounded-3xl border border-white/5 flex items-center justify-center mb-8 group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                     <span className="text-2xl font-black text-primary">{s.step}</span>
                  </div>
                  <h3 className="text-lg font-black mb-3 text-white">{s.title}</h3>
                  <p className="text-[11px] text-muted-foreground max-w-[200px] leading-relaxed">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Footer Info */}
        <footer className="w-full pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
             <span>Neural Engine v4.0</span>
             <span>•</span>
             <span>Encrypted Data</span>
             <span>•</span>
             <span>Clinical Datasets</span>
           </div>
           <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
           </div>
        </footer>
      </main>
    </div>
  );
}
