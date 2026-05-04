'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { API_URL, fetchApi } from '@/lib/api';
import { PlusCircle, History, Activity, TrendingUp, Heart, Calendar, ShieldCheck, ChevronRight, Eye, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assessData, userData] = await Promise.all([
          fetchApi('/assessments'),
          fetchApi('/auth/me')
        ]);

        setAssessments(assessData.assessments);
        setUser(userData.user);
      } catch (error: any) {
        toast.error(error.message);
        if (error.message === 'Authentication required') {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-14 w-48 rounded-2xl" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32 rounded-[2rem]" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-[400px] rounded-[2rem]" />
          </div>
          <div className="space-y-8">
            <Skeleton className="h-[300px] rounded-[2rem]" />
            <Skeleton className="h-[200px] rounded-[2rem]" />
          </div>
        </div>
      </div>
    );
  }

  const latestAssessment = assessments[0];

  const stats = [
    { 
      label: "Current Risk", 
      value: latestAssessment ? latestAssessment.riskLevel : "None", 
      subValue: latestAssessment ? `${latestAssessment.riskScore}/100 Score` : "No data", 
      icon: Activity, 
      color: "text-primary",
      bg: "bg-primary/10"
    },
    { 
      label: "Total Assessments", 
      value: assessments.length.toString(), 
      subValue: "Lifetime screenings", 
      icon: History, 
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      label: "Latest Screening", 
      value: latestAssessment ? new Date(latestAssessment.createdAt).toLocaleDateString() : "N/A", 
      subValue: "Recent checkup", 
      icon: Calendar, 
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    { 
      label: "Health Status", 
      value: "Monitoring", 
      subValue: "Active analysis", 
      icon: ShieldCheck, 
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground text-lg font-medium">Here's an overview of your health assistant dashboard.</p>
        </div>
        <Button 
          onClick={() => router.push('/assessment')} 
          size="lg"
          className="rounded-2xl px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 gap-2 font-bold"
        >
          <PlusCircle className="h-5 w-5" /> New Assessment
        </Button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="kpi-card group cursor-default">
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-black capitalize">{stat.value}</h3>
              <p className="text-xs font-semibold text-muted-foreground/60">{stat.subValue}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Health Trend Chart */}
      {assessments.length > 1 && (
        <div className="glass rounded-[2.5rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tight">Risk Trend Analysis</h3>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Hormonal Health Progression</p>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">AI Insight</Badge>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={assessments.slice().reverse().map(a => ({
                  date: new Date(a.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                  score: a.riskScore
                }))}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A0D14', 
                    border: '1px solid #ffffff10', 
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: 'white', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--primary)" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assessment History Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold tracking-tight">Recent Assessments</h3>
            <Button variant="link" className="text-primary font-bold">Export Data</Button>
          </div>
          
          <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
            {assessments.length > 0 ? (
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 px-8">Score</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] py-6">Risk Level</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] py-6">Date & Time</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 text-right px-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.slice(0, 5).map((a) => (
                    <TableRow key={a.id} className="group hover:bg-white/5 border-white/5 transition-colors cursor-pointer" onClick={() => router.push(`/results/${a.id}`)}>
                      <TableCell className="py-6 px-8">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg",
                          a.riskLevel === 'high' ? 'bg-destructive/20 text-destructive' : 
                          a.riskLevel === 'moderate' ? 'bg-amber-500/20 text-amber-500' : 
                          'bg-emerald-500/20 text-emerald-500'
                        )}>
                          {a.riskScore}
                        </div>
                      </TableCell>
                      <TableCell className="py-6 font-bold capitalize">
                        <Badge variant="outline" className={cn(
                          "text-[10px] uppercase font-black px-2 py-0 border-opacity-50",
                          a.riskLevel === 'high' ? 'border-destructive text-destructive bg-destructive/5' : 
                          a.riskLevel === 'moderate' ? 'border-amber-500 text-amber-500 bg-amber-500/5' : 
                          'border-emerald-500 text-emerald-500 bg-emerald-500/5'
                        )}>
                          {a.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-6">
                        <p className="text-sm font-bold">{new Date(a.createdAt).toLocaleDateString()}</p>
                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase">{new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </TableCell>
                      <TableCell className="py-6 px-8 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-xl hover:bg-primary/10 hover:text-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/results/${a.id}`);
                            }}
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/10" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-24 px-8">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <History className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">No History Yet</h3>
                <p className="text-muted-foreground mb-8 max-w-xs mx-auto text-sm font-medium">Take your first assessment to start monitoring your PCOS health risk.</p>
                <Button onClick={() => router.push('/assessment')} variant="outline" className="rounded-xl px-8 h-12 font-bold">
                  Start First Assessment
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          <div className="glass rounded-[2rem] p-8 border border-white/5 space-y-6">
            <h3 className="text-xl font-bold tracking-tight">Pro Health Tips</h3>
            <div className="space-y-4">
              {[
                { title: "Consistency is Key", desc: "Regular assessments help track how lifestyle changes affect your risk factors.", icon: Heart },
                { title: "Expert Consultation", desc: "Share these results with your doctor for a detailed clinical diagnosis.", icon: ShieldCheck }
              ].map((tip, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <tip.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">{tip.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-xl h-12 font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
              See More Insights
            </Button>
          </div>

          <div className="bg-primary rounded-[2rem] p-8 text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-primary-foreground/80 font-medium mb-6 leading-relaxed">Unlock advanced AI analysis and personalized wellness plans.</p>
              <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-xl font-bold h-12 shadow-lg">
                Upgrade Now
              </Button>
            </div>
            <Activity className="absolute -bottom-10 -right-10 w-40 h-40 text-white/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
