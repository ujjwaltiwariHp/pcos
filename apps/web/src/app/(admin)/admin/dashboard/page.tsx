'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { API_URL, fetchApi } from '@/lib/api';
import { Users, FileText, BarChart3, Download, Heart, TrendingUp, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchApi('/admin/stats');
        setStats(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this assessment?')) return;
    try {
      await fetchApi(`/admin/assessments/${id}`, { method: 'DELETE' });
      toast.success('Assessment deleted successfully');
      setStats({
        ...stats,
        recentActivity: stats.recentActivity.filter((a: any) => a.id !== id),
        totalAssessments: stats.totalAssessments - 1
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Heart className="absolute inset-0 m-auto text-primary w-5 h-5 animate-pulse" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Loading Admin Stats...</p>
        </div>
      </div>
    );
  }

  const kpis = [
    { label: "Total Registered Users", value: stats?.totalUsers || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Assessments Conducted", value: stats?.totalAssessments || 0, icon: FileText, color: "text-primary", bg: "bg-primary/10" },
    { label: "High Risk Flags", value: stats?.riskDistribution.find((d: any) => d.level === 'high')?.count || 0, icon: BarChart3, color: "text-destructive", bg: "bg-destructive/10" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">System Overview</h1>
          <p className="text-muted-foreground text-lg font-medium">Real-time health assessment analytics and user management.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={async () => {
            try {
              const res = await fetch(`${API_URL}/admin/assessments/export`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                credentials: 'include'
              });
              const blob = await res.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'pcos_assessments_export.csv';
              a.click();
            } catch (error) {
              toast.error("Failed to export data");
            }
          }}
          className="rounded-2xl h-14 px-8 border-border/50 hover:bg-muted font-bold gap-2"
        >
          <Download className="h-5 w-5" /> Export All Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="kpi-card group cursor-default">
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl", kpi.bg)}>
                <kpi.icon className={cn("w-6 h-6", kpi.color)} />
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              <h3 className="text-3xl font-black">{kpi.value}</h3>
              <p className="text-xs font-semibold text-muted-foreground/60">Across all platforms</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground">Master Assessment Feed</h3>
          <Button variant="link" className="text-primary font-bold">View Full Logs</Button>
        </div>
        
        <div className="glass rounded-[2rem] border border-border/50 overflow-x-auto shadow-2xl">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 px-8">ID</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6">Patient Info</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 text-center">Risk Score</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6">Status</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 px-8 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.recentActivity.map((a: any) => (
                <TableRow key={a.id} className="group hover:bg-muted/50 border-border/50 transition-colors">
                  <TableCell className="py-6 px-8 font-mono text-[11px] text-muted-foreground/80">
                    {a.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell className="py-6 font-bold">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-black">
                        {a.user?.name ? a.user.name.substring(0, 2).toUpperCase() : "US"}
                      </div>
                      <span className="text-sm">{a.user?.name || "Unknown User"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-center">
                    <span className={cn(
                      "text-lg font-black",
                      a.riskLevel === 'high' ? 'text-destructive' : 
                      a.riskLevel === 'moderate' ? 'text-amber-500' : 
                      'text-emerald-500'
                    )}>
                      {a.riskScore}
                    </span>
                  </TableCell>
                  <TableCell className="py-6">
                    <Badge variant="outline" className={cn(
                      "text-[10px] uppercase font-black px-2 py-0 border-opacity-50",
                      a.riskLevel === 'high' ? 'border-destructive text-destructive bg-destructive/5' : 
                      a.riskLevel === 'moderate' ? 'border-amber-500 text-amber-500 bg-amber-500/5' : 
                      'border-emerald-500 text-emerald-500 bg-emerald-500/5'
                    )}>
                      {a.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end gap-2 transition-all duration-300">
                      <Link href={`/results/${a.id}`}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary">
                          <Eye className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(a.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
