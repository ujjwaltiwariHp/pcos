import { Metadata } from 'next';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Sign In - PCOS AI Health Assistant',
  description: 'Sign in or create an account to start your PCOS assessment.',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-[480px] mx-auto animate-in fade-in zoom-in-95 duration-1000 ease-out px-4 py-10 md:py-20">
      <div className="glass rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
        
        <CardHeader className="p-0 mb-10 space-y-3 text-center">
          <CardTitle className="text-3xl md:text-4xl font-black tracking-tight text-white">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground font-medium text-sm md:text-base">
            Sign in to access your health dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="flex w-full p-1.5 bg-white/[0.03] rounded-[1.5rem] mb-10 border border-white/5 backdrop-blur-xl">
              <TabsTrigger 
                value="login" 
                className="flex-1 rounded-[1.1rem] py-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500
                data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)]
                data-[state=inactive]:hover:bg-white/5 data-[state=inactive]:text-muted-foreground/60"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="flex-1 rounded-[1.1rem] py-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500
                data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)]
                data-[state=inactive]:hover:bg-white/5 data-[state=inactive]:text-muted-foreground/60"
              >
                Register
              </TabsTrigger>
            </TabsList>
            
            <div className="relative overflow-hidden">
              <TabsContent value="login" className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-left-4 duration-500">
                <LoginForm />
              </TabsContent>
              
              <TabsContent value="register" className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-right-4 duration-500">
                <RegisterForm />
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] md:text-[10px] text-muted-foreground/30 leading-relaxed max-w-[240px] mx-auto uppercase tracking-[0.3em] font-black">
              Clinical-grade AI analysis and hormonal health monitoring.
            </p>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
