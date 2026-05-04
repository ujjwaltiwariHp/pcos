'use client';

import { useAssessmentStore } from '@/lib/store';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Step1 } from '@/components/assessment/Step1';
import { Step2 } from '@/components/assessment/Step2';
import { Step3 } from '@/components/assessment/Step3';
import { Step4 } from '@/components/assessment/Step4';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export default function AssessmentPage() {
  const { step } = useAssessmentStore();

  const steps = [
    { title: 'Personal', description: 'Basic health metrics.' },
    { title: 'Symptoms', description: 'Clinical symptoms.' },
    { title: 'Lab Data', description: 'Optional hormone values.' },
    { title: 'Lifestyle', description: 'Daily habits & patterns.' },
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          {steps.map((s, i) => {
            const isCompleted = step > i + 1;
            const isCurrent = step === i + 1;
            
            return (
              <div key={i} className="flex flex-col items-center flex-1 relative group">
                {/* Connector Line */}
                {i < steps.length - 1 && (
                  <div className={cn(
                    "absolute top-5 left-[60%] right-[-40%] h-[2px] z-0 hidden md:block transition-colors duration-500",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )} />
                )}
                
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black z-10 transition-all duration-500 shadow-xl",
                    isCurrent ? "bg-primary text-primary-foreground scale-110 shadow-primary/40 ring-4 ring-primary/20" : 
                    isCompleted ? "bg-emerald-500 text-primary-foreground" : 
                    "bg-muted/50 text-muted-foreground border border-border/50"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[4px]" /> : i + 1}
                </div>
                
                <div className="mt-4 text-center">
                  <p className={cn(
                    "text-[10px] uppercase tracking-[0.2em] font-black hidden md:block transition-colors duration-300",
                    isCurrent ? "text-primary" : isCompleted ? "text-emerald-500" : "text-muted-foreground/40"
                  )}>
                    Step 0{i + 1}
                  </p>
                  <span className={cn(
                    "text-xs font-bold hidden lg:block transition-colors duration-300",
                    isCurrent ? "text-foreground" : "text-muted-foreground/60"
                  )}>
                    {s.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="w-full bg-muted/30 h-1.5 rounded-full overflow-hidden border border-border/50">
          <div
            className="bg-primary h-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass rounded-[2.5rem] border border-border/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="p-8 md:p-10 border-b border-border/50 bg-muted/10">
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tight">{currentStep.title}</CardTitle>
            <CardDescription className="text-base font-medium text-muted-foreground">{currentStep.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8 md:p-10">
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
          </div>
        </CardContent>
      </div>
    </div>
  );
}
