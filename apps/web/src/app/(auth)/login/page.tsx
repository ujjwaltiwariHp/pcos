import { Metadata } from 'next';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { StarryBackground } from '@/components/ui/starry-background';
import { HeartPulse } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sign In - PCOS AI Health Assistant',
  description: 'Sign in or create an account to start your PCOS assessment.',
};

export default function LoginPage() {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-700">
      <div className="glass rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-white/10">
        <CardHeader className="p-0 mb-8 space-y-2 text-center">
          <CardTitle className="text-3xl font-black tracking-tight text-white">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            Sign in to access your health dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1.5 bg-white/5 rounded-2xl mb-10 border border-white/10">
              <TabsTrigger 
                value="login" 
                className="rounded-xl py-3 text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl transition-all"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="rounded-xl py-3 text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl transition-all"
              >
                Register
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-0 focus-visible:outline-none">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register" className="mt-0 focus-visible:outline-none">
              <RegisterForm />
            </TabsContent>
          </Tabs>
          
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-muted-foreground/40 leading-relaxed max-w-[300px] mx-auto uppercase tracking-[0.2em] font-black">
              Clinical-grade AI analysis and hormonal health monitoring.
            </p>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
