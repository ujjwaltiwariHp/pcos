'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { API_URL, fetchApi } from '@/lib/api';
import { FileText, Trash2, Eye, Calendar, TrendingUp, ArrowRight, ClipboardCheck } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function UserResultsHistoryPage() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await fetchApi('/assessments');
      setAssessments(data.assessments);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this assessment record?')) return;
    
    try {
      await fetchApi(`/assessments/${id}`, {
        method: 'DELETE',
      });
      toast.success('Assessment record deleted');
      setAssessments(assessments.filter(a => a.id !== id));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Assessment History</h1>
          <p className="text-muted-foreground text-lg font-medium">Track your health journey over time and review past AI insights.</p>
        </div>
        <Link href="/assessment">
          <Button 
            className="rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 font-bold gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            <ClipboardCheck className="h-5 w-5" /> Start New Assessment
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-muted/20 rounded-[2rem] animate-pulse border border-border/50" />
          ))}
        </div>
      ) : assessments.length === 0 ? (
        <div className="glass rounded-[3rem] border border-border/50 py-24 px-8 text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <FileText className="w-10 h-10 text-primary/40" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">No assessments yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">You haven't completed any health assessments yet. Start your first one to get AI-powered insights.</p>
          </div>
          <Link href="/assessment">
            <Button variant="outline" className="rounded-xl px-8 border-border/50 hover:bg-muted font-bold">
              Begin Now
            </Button>
          </Link>
        </div>
      ) : (
        <div className="glass rounded-[2rem] border border-border/50 overflow-hidden shadow-2xl">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 px-8">Date</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 text-center">Risk Level</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6">Score</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 px-8 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((a) => (
                <TableRow key={a.id} className="group hover:bg-muted/50 border-border/50 transition-colors">
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-muted-foreground/60" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground/90">{new Date(a.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{new Date(a.createdAt).getFullYear()}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-center">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px] uppercase font-black px-3 py-1 border-opacity-50",
                        a.riskLevel === 'high' ? 'border-destructive text-destructive bg-destructive/5' : 
                        a.riskLevel === 'moderate' ? 'border-amber-500 text-amber-500 bg-amber-500/5' : 
                        'border-emerald-500 text-emerald-500 bg-emerald-500/5'
                      )}
                    >
                      {a.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-2">
                       <TrendingUp className="w-4 h-4 text-primary" />
                       <span className="text-xl font-black">{a.riskScore}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
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
      )}
    </div>
  );
}
