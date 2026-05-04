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
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        document.cookie = "auth-bypass=true; path=/; max-age=604800; samesite=lax";
      }

      toast.success('Registration successful');
      const redirectPath = '/dashboard';
      window.location.replace(redirectPath);
    } catch (error: any) {
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
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="John Doe" 
                  {...field} 
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:ring-primary/20 hover:bg-white/[0.05] transition-all"
                />
              </FormControl>
              <FormMessage className="text-[10px] font-bold uppercase" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="name@example.com" 
                  {...field} 
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:ring-primary/20 hover:bg-white/[0.05] transition-all"
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
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">Secure Password</FormLabel>
              <FormControl>
                <div className="relative group">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    {...field} 
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:ring-primary/20 hover:bg-white/[0.05] transition-all pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-muted-foreground/40 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-[10px] font-bold uppercase" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] mt-4" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating Identity...' : 'Register as New Patient'}
        </Button>
      </form>
    </Form>
  );
}
