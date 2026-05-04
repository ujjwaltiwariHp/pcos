'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiskGauge } from '@/components/result/RiskGauge';
import { API_URL } from '@/lib/api';
import { AlertCircle, CheckCircle2, Info, ArrowLeft, Download, Heart, ShieldAlert, ChevronRight, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [assessment, setAssessment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await fetch(`${API_URL}/assessments/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setAssessment(data.assessment);
      } catch (error: any) {
        toast.error(error.message);
        router.push('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessment();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Heart className="absolute inset-0 m-auto text-primary w-5 h-5 animate-pulse" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Analyzing results...</p>
        </div>
      </div>
    );
  }

  if (!assessment) return null;

  const { aiAnalysis, riskScore, riskLevel } = assessment;

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low': return <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/50 uppercase font-black px-4 py-1">Low Risk</Badge>;
      case 'moderate': return <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/50 uppercase font-black px-4 py-1">Moderate Risk</Badge>;
      case 'high': return <Badge className="bg-destructive/20 text-destructive border-destructive/50 uppercase font-black px-4 py-1">High Risk</Badge>;
      default: return <Badge className="uppercase font-black px-4 py-1">{level}</Badge>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/dashboard')} 
          className="text-muted-foreground hover:text-white group gap-2 font-bold px-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> 
          Back to Health Overview
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Status:</span>
          {getRiskBadge(riskLevel)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Risk Score Gauge */}
        <div className="lg:col-span-4">
          <div className="glass rounded-[2.5rem] border border-white/10 p-8 h-full flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-muted-foreground/60">Risk Profile</h3>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
              <RiskGauge score={riskScore} />
            </div>
            <div className="mt-8 space-y-1">
              <p className="text-4xl font-black capitalize">{riskLevel} Risk</p>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-tighter">Diagnostic Score: {riskScore}/100</p>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="lg:col-span-8">
          <div className="glass rounded-[2.5rem] border border-white/10 h-full overflow-hidden flex flex-col">
            <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <ShieldAlert className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tight">AI Diagnostic Summary</CardTitle>
                  <CardDescription className="text-muted-foreground font-medium">Deep analysis of symptoms and clinical markers.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8 flex-1">
              <div>
                <h4 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Key Risk Drivers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aiAnalysis.keyFactors.map((factor: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 font-bold text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      {factor}
                    </div>
                  ))}
                </div>
              </div>
              
              {aiAnalysis.shouldSeeDoctor && (
                <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-3xl flex items-start gap-5 animate-pulse-slow">
                  <div className="p-3 bg-destructive/20 rounded-2xl">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-black text-destructive uppercase tracking-widest text-sm mb-1">Medical Consultation Recommended</h4>
                    <p className="text-sm font-medium text-destructive/80 leading-relaxed">
                      Our AI recommends consulting a healthcare professional {aiAnalysis.urgency} for a clinical evaluation.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recommendations */}
        <div className="glass rounded-[2.5rem] border border-white/10 p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-black tracking-tight">Lifestyle Protocol</h3>
          </div>
          <div className="space-y-3">
            {aiAnalysis.recommendations.map((rec: string, i: number) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 text-xs font-black">
                  {i + 1}
                </div>
                <p className="text-sm font-bold leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report Card */}
        <div className="bg-primary rounded-[2.5rem] p-10 text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden flex flex-col justify-between group">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white/20 rounded-2xl">
                 <FileText className="h-6 w-6 text-white" />
               </div>
               <h3 className="text-2xl font-black tracking-tight">Clinical Report</h3>
            </div>
            <p className="text-lg font-medium text-primary-foreground/80 leading-relaxed">
              Generate a comprehensive PDF health dossier to present to your gynecologist or endocrinologist.
            </p>
            <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl font-black h-16 shadow-2xl text-lg group gap-3" disabled>
              <Download className="h-6 w-6 group-hover:translate-y-1 transition-transform" /> 
              Download Report
            </Button>
          </div>
          <div className="relative z-10 pt-8 mt-8 border-t border-white/10">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic leading-tight">
              {aiAnalysis.disclaimer}
            </p>
          </div>
          <Heart className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
}
