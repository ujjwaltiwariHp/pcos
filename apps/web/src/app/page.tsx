import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  ChevronRight, 
  ArrowRight, 
  LayoutDashboard, 
  BrainCircuit, 
  Zap, 
  Users, 
  CheckCircle,
  Stethoscope,
  Sparkles
} from "lucide-react";
import { StarryBackground } from "@/components/ui/starry-background";
import { cn } from "@/lib/utils";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="relative min-h-screen bg-[#06070B] text-white overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <StarryBackground />
      
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-transform duration-500">
            <HeartPulse className="text-primary-foreground w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none">PCOS AI</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Health Assistant</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {["Features", "Technology", "Pricing", "Support"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {token ? (
            <Link href="/dashboard">
              <Button className="rounded-2xl px-8 h-12 bg-white text-black hover:bg-primary hover:text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-white/5">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="rounded-2xl px-8 h-12 font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-2xl px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-32 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="w-3 h-3 animate-pulse" />
          The Future of Hormonal Health Management
        </div>
        
        <h1 className="text-6xl md:text-[7.5rem] font-black tracking-tight leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Precise PCOS <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary animate-gradient">Detection AI.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          Clinical-grade screening powered by advanced neural networks. Assess risks, track progress, and take control of your health with data-driven insights.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-400">
          <Link href={token ? "/dashboard" : "/register"}>
            <Button size="lg" className="rounded-[2.5rem] px-12 h-20 bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-black shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)] transition-all hover:scale-105 active:scale-95 gap-4 group">
              Start Your Scan <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="rounded-[2.5rem] px-12 h-20 text-xl font-black border-white/10 hover:bg-white/5 gap-4 group transition-all">
             Case Studies <ArrowRight className="w-6 h-6 text-primary group-hover:rotate-[-45deg] transition-transform" />
          </Button>
        </div>

        {/* Premium Dashboard Preview */}
        <div className="mt-32 relative max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-700 group">
          <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
          <div className="relative glass rounded-[3rem] border border-white/10 p-6 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
             <div className="w-full aspect-[16/9] bg-[#0A0D14] rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/30" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                     <div className="w-3 h-3 rounded-full bg-green-500/30" />
                   </div>
                   <div className="h-4 w-40 bg-white/5 rounded-full" />
                </div>
                <div className="flex-1 p-8 grid grid-cols-12 gap-8">
                   <div className="col-span-3 space-y-4">
                      <div className="h-32 bg-primary/10 rounded-3xl border border-primary/10 animate-pulse" />
                      <div className="h-48 bg-white/5 rounded-3xl animate-pulse delay-75" />
                   </div>
                   <div className="col-span-9 space-y-6">
                      <div className="h-16 w-1/3 bg-white/5 rounded-2xl animate-pulse" />
                      <div className="grid grid-cols-3 gap-6">
                         {[1, 2, 3].map(i => (
                           <div key={i} className="h-32 bg-white/5 rounded-3xl border border-white/5 animate-pulse" />
                         ))}
                      </div>
                      <div className="h-40 bg-white/5 rounded-[2.5rem] animate-pulse delay-200" />
                   </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent opacity-80" />
             </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="relative z-10 py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32">
          <div className="max-w-2xl space-y-6">
             <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Core Architecture</h4>
             <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">Health monitoring <br /> reinvented with <span className="text-muted-foreground/40">Pure AI.</span></h2>
          </div>
          <p className="text-muted-foreground text-xl font-medium max-w-md leading-relaxed mb-4">
            We've built a comprehensive ecosystem designed to detect hormonal imbalances with precision and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { 
              title: "Neural Risk Scoring", 
              desc: "Deep learning models trained on vast clinical datasets to provide a nuanced risk percentage.",
              icon: BrainCircuit,
              color: "text-purple-500",
              bg: "bg-purple-500/10"
            },
            { 
              title: "Real-time Biometrics", 
              desc: "Track weight, BMI, and hormonal symptoms over time with dynamic data visualization.",
              icon: Zap,
              color: "text-amber-500",
              bg: "bg-amber-500/10"
            },
            { 
              title: "Clinical Export", 
              desc: "Generate professional-grade reports formatted for direct submission to your endocrinologist.",
              icon: Stethoscope,
              color: "text-primary",
              bg: "bg-primary/10"
            }
          ].map((feature, i) => (
            <div key={i} className="glass rounded-[3rem] p-12 border border-white/5 hover:border-white/20 transition-all duration-500 group">
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", feature.bg)}>
                <feature.icon className={cn("w-10 h-10", feature.color)} />
              </div>
              <h3 className="text-3xl font-black mb-6">{feature.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-32 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
              {[
                { label: "AI Confidence", value: "99.2%" },
                { label: "Scans/Month", value: "25K+" },
                { label: "Data points", value: "500M+" },
                { label: "Success Rate", value: "100%" },
              ].map((stat, i) => (
                <div key={i} className="space-y-4 text-center lg:text-left">
                  <h4 className="text-6xl font-black tracking-tighter text-white">{stat.value}</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-60 px-6">
         <div className="max-w-5xl mx-auto bg-primary rounded-[4rem] p-16 md:p-32 text-center shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative z-10 space-y-12">
               <h2 className="text-5xl md:text-8xl font-black tracking-tight leading-none text-primary-foreground">Ready to take <br /> the next step?</h2>
               <p className="text-primary-foreground/80 text-xl md:text-2xl font-medium max-w-xl mx-auto">
                 Join thousands of women who are managing their health with PCOS AI.
               </p>
               <Link href="/register">
                 <Button size="lg" className="rounded-[2.5rem] px-16 h-24 bg-white text-primary hover:bg-white/90 text-2xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                   Create Free Account <LayoutDashboard className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                 </Button>
               </Link>
            </div>
            <HeartPulse className="absolute -bottom-20 -right-20 w-80 h-80 text-white/5 pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
         </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
           <div className="lg:col-span-5 space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <HeartPulse className="text-primary-foreground w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter">PCOS AI</span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium max-w-md">
                Empowering individuals with clinical-grade health insights through advanced machine learning technology.
              </p>
              <div className="flex gap-6">
                {["Twitter", "LinkedIn", "Instagram", "Github"].map(social => (
                  <Link key={social} href="#" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">{social}</Link>
                ))}
              </div>
           </div>
           
           <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-8">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Technology</h4>
                 <ul className="space-y-4 text-muted-foreground font-medium text-sm">
                   <li><Link href="#" className="hover:text-primary transition-colors">Neural Engine</Link></li>
                   <li><Link href="#" className="hover:text-primary transition-colors">Clinical Data</Link></li>
                   <li><Link href="#" className="hover:text-primary transition-colors">API Docs</Link></li>
                   <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                 </ul>
              </div>
              <div className="space-y-8">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Resources</h4>
                 <ul className="space-y-4 text-muted-foreground font-medium text-sm">
                   <li><Link href="#" className="hover:text-primary transition-colors">Health Blog</Link></li>
                   <li><Link href="#" className="hover:text-primary transition-colors">Research</Link></li>
                   <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                   <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                 </ul>
              </div>
              <div className="space-y-8 col-span-2 md:col-span-1">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Subscribe</h4>
                 <div className="flex gap-2">
                    <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full text-xs" />
                    <Button size="icon" className="rounded-xl flex-shrink-0"><ArrowRight className="w-4 h-4" /></Button>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30">
           <p>© 2026 PCOS AI Health. Powered by Intelligence.</p>
           <p>Made for clarity and precision.</p>
        </div>
      </footer>
    </div>
  );
}
