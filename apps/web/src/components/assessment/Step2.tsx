'use client';

import { useAssessmentStore } from '@/lib/store';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SYMPTOMS = [
  { id: 'irregular_periods', label: 'Irregular or missed periods' },
  { id: 'heavy_periods', label: 'Very heavy periods' },
  { id: 'excess_hair', label: 'Excess hair on face/body' },
  { id: 'acne', label: 'Severe acne or oily skin' },
  { id: 'thinning_hair', label: 'Thinning hair or hair loss' },
  { id: 'weight_gain', label: 'Weight gain difficulty' },
  { id: 'dark_skin_patches', label: 'Darkening of skin in creases' },
  { id: 'skin_tags', label: 'Skin tags' },
  { id: 'pelvic_pain', label: 'Chronic pelvic pain' },
  { id: 'mood_swings', label: 'Frequent mood swings/anxiety' },
  { id: 'fatigue', label: 'Persistent fatigue' },
  { id: 'sleep_apnea', label: 'Sleep apnea issues' },
];

export function Step2() {
  const { symptomsData, setSymptomsData, setStep } = useAssessmentStore();

  const handleToggle = (id: string) => {
    setSymptomsData({
      ...symptomsData,
      [id]: !symptomsData[id],
    });
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SYMPTOMS.map((symptom) => (
          <div 
            key={symptom.id} 
            className={cn(
              "group flex items-center space-x-3 p-4 rounded-2xl border transition-all cursor-pointer",
              symptomsData[symptom.id] 
                ? "bg-primary/10 border-primary shadow-lg shadow-primary/5" 
                : "bg-muted/30 border-border/50 hover:border-border hover:bg-muted/50"
            )}
            onClick={() => handleToggle(symptom.id)}
          >
            <Checkbox
              id={symptom.id}
              checked={!!symptomsData[symptom.id]}
              onCheckedChange={() => handleToggle(symptom.id)}
              className="w-5 h-5 rounded-lg border-2"
            />
            <Label 
              htmlFor={symptom.id} 
              className="text-sm font-bold leading-tight cursor-pointer group-hover:text-foreground transition-colors"
            >
              {symptom.label}
            </Label>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)}
          className="rounded-2xl h-14 px-8 border-border/50 hover:bg-muted font-bold gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </Button>
        <Button 
          onClick={() => setStep(3)}
          className="rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 font-black gap-2 transition-all hover:translate-x-1"
        >
          Next: Lab Results <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
