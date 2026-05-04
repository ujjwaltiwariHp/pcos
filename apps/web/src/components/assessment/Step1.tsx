'use client';

import { useEffect } from 'react';
import { useAssessmentStore } from '@/lib/store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function Step1() {
  const { personalData, setPersonalData, setStep } = useAssessmentStore();

  const calculateBMI = (w: number, h: number) => {
    if (w > 0 && h > 0) {
      const heightInMeters = h / 100;
      return parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return 0;
  };

  useEffect(() => {
    const bmi = calculateBMI(personalData.weight, personalData.height);
    if (bmi !== personalData.bmi) {
      setPersonalData({ bmi });
    }
  }, [personalData.weight, personalData.height]);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="age" className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="e.g. 25"
            className="h-14 rounded-2xl bg-muted/30 border-border/50 focus:border-primary/50 transition-all font-bold text-lg"
            value={personalData.age || ''}
            onChange={(e) => setPersonalData({ age: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="height" className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="e.g. 165"
            className="h-14 rounded-2xl bg-muted/30 border-border/50 focus:border-primary/50 transition-all font-bold text-lg"
            value={personalData.height || ''}
            onChange={(e) => setPersonalData({ height: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="weight" className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="e.g. 60"
            className="h-14 rounded-2xl bg-muted/30 border-border/50 focus:border-primary/50 transition-all font-bold text-lg"
            value={personalData.weight || ''}
            onChange={(e) => setPersonalData({ weight: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="bmi" className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">BMI (Auto-calculated)</Label>
          <div className="relative">
             <Input 
               id="bmi" 
               type="number" 
               value={personalData.bmi} 
               readOnly 
               className="h-14 rounded-2xl bg-primary/5 border-primary/20 text-primary font-black text-xl" 
             />
             <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[10px] font-black uppercase tracking-widest text-primary/40">
                Score
             </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button 
          onClick={() => setStep(2)} 
          size="lg"
          className="rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 font-black gap-2 transition-all hover:translate-x-1"
        >
          Next: Symptoms <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
