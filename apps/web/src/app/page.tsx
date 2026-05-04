import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { HeartPulse, ShieldCheck, Activity, TrendingUp, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { StarryBackground } from "@/components/ui/starry-background";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="relative min-h-screen bg-[#090A0F] text-white overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <StarryBackground />
      
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <HeartPulse className="text-primary-foreground w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">PCOS AI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">How it works</Link>
          <Link href="#about" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">About</Link>
        </div>

        <div>
          {token ? (
            <Link href="/dashboard">
              <Button className="rounded-xl px-6 bg-primary hover:bg-primary/90 font-bold">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="rounded-xl px-6 border-white/10 hover:bg-white/5 font-bold">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ShieldCheck className="w-4 h-4" />
          AI-Powered Health Assistant
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Understand Your Health <br /> 
          <span className="text-primary">With Precision AI.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          PCOS AI uses advanced machine learning to help you assess your risk factors, track symptoms, and provide professional-grade health insights at your fingertips.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <Link href={token ? "/dashboard" : "/login"}>
            <Button size="lg" className="rounded-[2rem] px-10 h-16 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-black shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 gap-3 group">
              Launch App <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="rounded-[2rem] px-10 h-16 text-lg font-bold hover:bg-white/5 gap-3">
             View Documentation <ArrowRight className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* Dashboard Preview Placeholder */}
        <div className="mt-24 relative max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-500">
          <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full opacity-50" />
          <div className="relative glass rounded-[2.5rem] border border-white/10 p-4 shadow-2xl overflow-hidden aspect-video group">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent group-hover:opacity-60 transition-opacity" />
             <div className="w-full h-full bg-[#0f172a] rounded-[2rem] p-8 flex flex-col gap-6 text-left border border-white/5">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="h-4 w-32 bg-white/5 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
                  <div className="h-32 bg-white/5 rounded-2xl animate-pulse delay-75" />
                  <div className="h-32 bg-white/5 rounded-2xl animate-pulse delay-150" />
                </div>
                <div className="flex-1 bg-white/5 rounded-2xl animate-pulse delay-300" />
             </div>
          </div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="relative z-10 py-24 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "AI Precision", value: "98.4%" },
            { label: "Active Users", value: "12K+" },
            { label: "Assessments", value: "50K+" },
            { label: "Data Points", value: "1M+" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-4xl font-black text-primary">{stat.value}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Designed for <span className="text-primary">Clarity.</span></h2>
          <p className="text-muted-foreground font-medium text-lg max-w-xl mx-auto">Everything you need to monitor and manage PCOS risk factors in one professional dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Risk Analysis", 
              desc: "Proprietary machine learning models analyze dozens of clinical markers to provide accurate risk assessment.",
              icon: Activity
            },
            { 
              title: "Health Trends", 
              desc: "Visualize your health journey with dynamic charts and history tracking to see real-world progress.",
              icon: TrendingUp
            },
            { 
              title: "Professional Reporting", 
              desc: "Export detailed PDF reports of your findings to share with your healthcare providers for clinical diagnosis.",
              icon: ShieldCheck
            }
          ].map((feature, i) => (
            <div key={i} className="kpi-card group cursor-default p-10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <HeartPulse className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter">PCOS AI</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium max-w-xs leading-relaxed">
              Empowering women with AI-driven health insights and proactive PCOS monitoring.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12">
             <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                  <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">API</Link></li>
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                  <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                </ul>
             </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
           <p>© 2026 PCOS AI Health Assistant. All rights reserved.</p>
           <div className="flex gap-8">
              <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
