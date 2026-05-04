'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/lib/store';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { API_URL, fetchApi } from '@/lib/api';
import { ChevronLeft, Sparkles, Loader2 } from 'lucide-react';

export function Step4() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lifestyleData, setLifestyleData, setStep, personalData, symptomsData, hormonalData } = useAssessmentStore();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = await fetchApi('/assessments', {
        method: 'POST',
        body: JSON.stringify({
          personalData,
          symptomsData,
          hormonalData,
          lifestyleData,
        }),
      });

      toast.success('Assessment complete! Viewing results...');
      router.push(`/results/${data.assessment.id}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Diet Quality</Label>
            <span className="text-xl font-black text-primary">{lifestyleData.diet}/10</span>
          </div>
          <Slider
            value={[lifestyleData.diet]}
            min={1}
            max={10}
            step={1}
            onValueChange={(val) => setLifestyleData({ diet: Array.isArray(val) ? val[0] : val })}
            className="py-4"
          />
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter">1 = Poor, 10 = Excellent</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Exercise Frequency</Label>
            <span className="text-xl font-black text-primary">{lifestyleData.exercise}/10</span>
          </div>
          <Slider
            value={[lifestyleData.exercise]}
            min={1}
            max={10}
            step={1}
            onValueChange={(val) => setLifestyleData({ exercise: Array.isArray(val) ? val[0] : val })}
            className="py-4"
          />
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter">1 = None, 10 = Daily</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Stress Levels</Label>
            <span className="text-xl font-black text-destructive">{lifestyleData.stress}/10</span>
          </div>
          <Slider
            value={[lifestyleData.stress]}
            min={1}
            max={10}
            step={1}
            onValueChange={(val) => setLifestyleData({ stress: Array.isArray(val) ? val[0] : val })}
            className="py-4"
          />
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter">1 = Low, 10 = Very High</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Sleep Quality</Label>
            <span className="text-xl font-black text-emerald-500">{lifestyleData.sleep}h</span>
          </div>
          <Slider
            value={[lifestyleData.sleep]}
            min={1}
            max={12}
            step={0.5}
            onValueChange={(val) => setLifestyleData({ sleep: Array.isArray(val) ? val[0] : val })}
            className="py-4"
          />
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter">Hours per night</p>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-white/5">
        <Button 
          variant="outline" 
          onClick={() => setStep(3)} 
          disabled={isSubmitting}
          className="rounded-2xl h-14 px-8 border-white/10 hover:bg-white/5 font-bold gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          size="lg"
          className="rounded-2xl h-16 px-10 bg-primary hover:bg-primary/90 font-black gap-3 shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing with AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
              <span>Submit Assessment</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
