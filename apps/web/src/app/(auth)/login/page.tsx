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
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 w-full max-w-[440px] animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-4 animate-bounce-slow">
            <HeartPulse className="text-primary-foreground w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            PCOS AI
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">
            Professional Health Assistant
          </p>
        </div>

        <div className="glass rounded-[2.5rem] p-8 shadow-2xl border border-white/10">
          <CardHeader className="p-0 mb-8 space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your health dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-white/5 rounded-2xl mb-8 border border-white/10">
                <TabsTrigger 
                  value="login" 
                  className="rounded-xl py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="rounded-xl py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
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
            
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[11px] text-muted-foreground/60 leading-relaxed max-w-[280px] mx-auto uppercase tracking-tighter font-semibold">
                For informational use only. Powered by advanced AI diagnostic analysis.
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
