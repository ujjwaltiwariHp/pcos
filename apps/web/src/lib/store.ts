import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AssessmentState {
  step: number;
  personalData: {
    age: number;
    height: number;
    weight: number;
    bmi: number;
  };
  symptomsData: Record<string, boolean>;
  hormonalData: Record<string, string | number>;
  lifestyleData: {
    diet: number;
    exercise: number;
    stress: number;
    sleep: number;
  };
  setStep: (step: number) => void;
  setPersonalData: (data: Partial<AssessmentState['personalData']>) => void;
  setSymptomsData: (data: Record<string, boolean>) => void;
  setHormonalData: (data: Record<string, string | number>) => void;
  setLifestyleData: (data: Partial<AssessmentState['lifestyleData']>) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  personalData: {
    age: 25,
    height: 165,
    weight: 60,
    bmi: 22,
  },
  symptomsData: {},
  hormonalData: {},
  lifestyleData: {
    diet: 5,
    exercise: 5,
    stress: 5,
    sleep: 7,
  },
};

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      setPersonalData: (data) => set((state) => ({ personalData: { ...state.personalData, ...data } })),
      setSymptomsData: (data) => set({ symptomsData: data }),
      setHormonalData: (data) => set({ hormonalData: data }),
      setLifestyleData: (data) => set((state) => ({ lifestyleData: { ...state.lifestyleData, ...data } })),
      reset: () => set(initialState),
    }),
    {
      name: 'pcos-assessment-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
