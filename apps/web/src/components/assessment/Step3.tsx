'use client';

import { useAssessmentStore } from '@/lib/store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

const HORMONES = [
  { id: 'testosterone', label: 'Total Testosterone', unit: 'ng/dL', range: '15-70' },
  { id: 'lh', label: 'LH (Luteinizing)', unit: 'mIU/mL', range: '2-10' },
  { id: 'fsh', label: 'FSH (Follicle)', unit: 'mIU/mL', range: '3-10' },
  { id: 'prolactin', label: 'Prolactin', unit: 'ng/mL', range: '4-23' },
  { id: 'amh', label: 'AMH', unit: 'ng/mL', range: '1.5-4.0' },
  { id: 'dhea_s', label: 'DHEA-S', unit: 'µg/dL', range: '80-350' },
];

export function Step3() {
  const { hormonalData, setHormonalData, setStep } = useAssessmentStore();

  const handleInputChange = (id: string, value: string) => {
    setHormonalData({
      ...hormonalData,
      [id]: value,
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex items-start gap-4 p-6 bg-primary/10 border border-primary/20 rounded-[2rem]">
        <div className="p-2 bg-primary/20 rounded-xl">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-bold text-primary mb-1 uppercase tracking-widest">Clinical Data Opportunity</p>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            If you have recent blood test results, enter them below for a more precise AI diagnostic analysis. You may also skip this step.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HORMONES.map((hormone) => (
          <div key={hormone.id} className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <Label htmlFor={hormone.id} className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">{hormone.label}</Label>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Range: {hormone.range}</span>
            </div>
            <div className="relative group">
              <Input
                id={hormone.id}
                type="text"
                placeholder="Enter value"
                value={hormonalData[hormone.id] || ''}
                onChange={(e) => handleInputChange(hormone.id, e.target.value)}
                className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-bold text-lg pr-20"
              />
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                {hormone.unit}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(2)}
          className="rounded-2xl h-14 px-8 border-white/10 hover:bg-white/5 font-bold gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </Button>
        <Button 
          onClick={() => setStep(4)}
          className="rounded-2xl h-14 px-8 bg-primary hover:bg-primary/90 font-black gap-2 transition-all hover:translate-x-1"
        >
          Next: Lifestyle <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
