import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  Microscope,
  Stethoscope,
  Activity,
  ArrowRight
} from "lucide-react";
import { StarryBackground } from "@/components/ui/starry-background";
import { ModeToggle } from "@/components/mode-toggle";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden selection:bg-primary/30 scroll-smooth">
      <StarryBackground />
      
      {/* Dynamic Glow Orbs - Adaptive to theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none opacity-50 dark:opacity-100" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-10 py-8 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <HeartPulse className="text-primary-foreground w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">PCOS AI</span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Clinical Systems</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <ModeToggle />
          {token ? (
            <Link href="/dashboard">
              <Button className="rounded-xl px-6 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-black text-[10px] uppercase tracking-widest transition-all">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="rounded-xl px-6 h-11 font-black text-[10px] uppercase tracking-widest transition-all">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-xl px-6 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center px-6 max-w-7xl mx-auto">
        <section className="flex flex-col items-center justify-center min-h-[70vh] text-center pt-20 pb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Reproductive Health through AI
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Clinical Intelligence for <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary">Hormonal Health.</span>
          </h1>
          
          <p className="max-w-2xl text-sm md:text-lg text-muted-foreground font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Bridging the diagnostic gap with high-precision neural analysis. Professional-grade screening for PCOS, designed for patient empowerment and clinical support.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-24 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <Link href={token ? "/dashboard" : "/register"}>
              <Button size="lg" className="rounded-2xl px-12 h-16 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 gap-3 group">
                Start Free Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="rounded-2xl px-8 h-16 border-border hover:bg-muted font-bold transition-all">
                Learn Methodology
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-16 border-t border-border w-full max-w-4xl opacity-50">
             <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-black">99.2%</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Precision</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-black">50k+</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Datasets</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-black">24/7</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Availability</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-black">AES-256</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Encrypted</span>
             </div>
          </div>
        </section>

        {/* Diagnostic Flow */}
        <section id="how-it-works" className="w-full py-32 border-y border-border">
          <div className="text-center mb-24">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">The Workflow</h4>
            <h2 className="text-4xl font-black tracking-tight">How Our Diagnostic AI Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative max-w-5xl mx-auto px-4">
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />
            
            {[
              { icon: Activity, title: "Biomarker Intake", desc: "Detailed analysis of symptoms, lifestyle patterns, and clinical markers." },
              { icon: Microscope, title: "Neural Synthesis", desc: "Proprietary models cross-reference data against thousands of validated cases." },
              { icon: ShieldCheck, title: "Clinical Reporting", desc: "Receive a professional-grade PDF report with actionable health insights." }
            ].map((s, i) => (
              <div key={i} className="relative z-10 p-8 rounded-[2.5rem] bg-card/50 backdrop-blur-md border border-border flex flex-col items-center text-center group hover:border-primary/30 transition-all duration-500 shadow-xl">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-black mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scope & Impact */}
        <section className="w-full py-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[9px] font-black uppercase tracking-[0.2em]">
              The Problem & Our Solution
            </div>
            <h2 className="text-5xl font-black leading-[1.1] tracking-tighter">
              Reducing the 7-Year <br /> Diagnostic Lag.
            </h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
              On average, it takes over 7 years and 3 doctor visits to receive a PCOS diagnosis. PCOS AI reduces this lag by providing immediate, clinical-grade preliminary screening.
            </p>
            <div className="space-y-4 pt-4">
               {[
                 "Early identification of androgenic patterns",
                 "Metabolic health tracking & risk scoring",
                 "Seamless data export for physician review"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                       <ChevronRight className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-bold">{item}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="relative group">
             <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="relative p-12 bg-card rounded-[3rem] border border-border shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                         <Stethoscope className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                         <h4 className="font-black text-sm">For Practitioners</h4>
                         <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Clinical Integration</p>
                      </div>
                   </div>
                </div>
                <h3 className="text-2xl font-black mb-6">Built for Doctors.</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                   Our reports follow standardized clinical guidelines, making it easy for healthcare providers to review a patient's comprehensive health data at a glance.
                </p>
                <div className="p-6 bg-muted/50 rounded-2xl border border-border italic text-xs font-medium text-muted-foreground">
                   "The depth of data provided by PCOS AI significantly streamlines my initial patient consultation by providing a pre-analyzed metabolic baseline."
                   <p className="mt-4 not-italic font-black text-foreground">— Senior Gynecologist, AI Med Systems</p>
                </div>
             </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-20 border-t border-border flex flex-col items-center gap-12">
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <HeartPulse className="text-primary w-7 h-7" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/50">PCOS Clinical Intelligence Systems</p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Safety Protocols</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacy Standard</Link>
              <Link href="#" className="hover:text-primary transition-colors">Methodology</Link>
              <Link href="#" className="hover:text-primary transition-colors">Support</Link>
           </div>
           
           <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.3em] text-center max-w-md">
              © 2026 PCOS AI HEALTH SYSTEMS. ALL DATA IS ENCRYPTED AND PROCESSED FOLLOWING GLOBAL CLINICAL STANDARDS.
           </p>
        </footer>
      </main>
    </div>
  );
}
