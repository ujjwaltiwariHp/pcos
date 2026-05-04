'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { API_URL } from '@/lib/api';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        document.cookie = "auth-bypass=true; path=/; max-age=604800; samesite=lax";
      }

      toast.success('Login successful');
      console.log('Login success, user role:', data.user.role);
      
      const redirectPath = data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      console.log('Redirecting to:', redirectPath);
      
      // Use replace to ensure the browser doesn't keep the login page in history
      // and force a fresh load of the destination
      window.location.replace(redirectPath);
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="name@example.com" 
                  {...field} 
                  className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 transition-all"
                />
              </FormControl>
              <FormMessage className="text-[10px] font-bold uppercase" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Password</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    {...field} 
                    className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/20 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-[10px] font-bold uppercase" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]" 
          disabled={isLoading}
        >
          {isLoading ? 'Processing Access...' : 'Sign In to Portal'}
        </Button>
      </form>
    </Form>
  );
}
