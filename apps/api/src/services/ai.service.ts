import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const aiAnalysisSchema = z.object({
  riskScore: z.number().min(0).max(100),
  riskLevel: z.enum(['low', 'moderate', 'high']),
  keyFactors: z.array(z.string()),
  recommendations: z.array(z.string()),
  shouldSeeDoctor: z.boolean(),
  urgency: z.enum(['routine', 'within 3 months', 'within 1 month', 'urgent']),
  disclaimer: z.string(),
});

export type AIAnalysis = z.infer<typeof aiAnalysisSchema>;

export const analyzeAssessment = async (data: {
  personalData: any;
  symptomsData: any;
  hormonalData?: any;
  lifestyleData: any;
}): Promise<AIAnalysis> => {
  const systemPrompt = `You are a clinical AI assistant specializing in PCOS risk assessment.
Analyze the patient data provided and return ONLY a JSON object with this exact shape:
{
  "riskScore": number (0–100),
  "riskLevel": "low" | "moderate" | "high",
  "keyFactors": string[],
  "recommendations": string[],
  "shouldSeeDoctor": boolean,
  "urgency": "routine" | "within 3 months" | "within 1 month" | "urgent",
  "disclaimer": "This assessment is for informational purposes only and does not constitute medical diagnosis or advice."
}
Risk thresholds: 0–39 = Low, 40–69 = Moderate, 70–100 = High.
No markdown, no preamble, no explanation. Only the JSON object.`;

  const userPrompt = `Patient Data:
${JSON.stringify(data, null, 2)}`;

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('ANTHROPIC_API_KEY is missing. Using heuristic fallback for analysis.');
      return calculateHeuristicAnalysis(data);
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format from AI');
    }

    const result = JSON.parse(content.text);
    return aiAnalysisSchema.parse(result);
  } catch (error) {
    console.error('AI Analysis Error:', error);
    // Fallback to heuristic analysis if AI fails
    console.log('Falling back to heuristic analysis...');
    return calculateHeuristicAnalysis(data);
  }
};

const calculateHeuristicAnalysis = (data: any): AIAnalysis => {
  // Simple heuristic for PCOS risk
  let score = 20; // Base score
  
  // BMI Factor
  if (data.personalData.bmi > 25) score += 15;
  if (data.personalData.bmi > 30) score += 15;
  
  // Symptoms Factor
  const symptomCount = Object.values(data.symptomsData).filter(v => v === true).length;
  score += symptomCount * 8;
  
  // Lifestyle Factor
  if (data.lifestyleData.stress > 7) score += 10;
  if (data.lifestyleData.sleep < 6) score += 5;
  if (data.lifestyleData.diet < 5) score += 5;

  score = Math.min(score, 95);
  
  let level: 'low' | 'moderate' | 'high' = 'low';
  if (score >= 70) level = 'high';
  else if (score >= 40) level = 'moderate';

  const factors = [];
  if (data.personalData.bmi > 25) factors.push('Elevated BMI');
  if (symptomCount > 3) factors.push('Multiple reported clinical symptoms');
  if (data.lifestyleData.stress > 7) factors.push('High physiological stress markers');

  return {
    riskScore: score,
    riskLevel: level,
    keyFactors: factors.length > 0 ? factors : ['General metabolic profile'],
    recommendations: [
      'Maintain a balanced, low-glycemic diet.',
      'Engage in 150 minutes of moderate activity weekly.',
      'Monitor hormonal cycles and symptom frequency.'
    ],
    shouldSeeDoctor: score >= 40,
    urgency: score >= 70 ? 'within 1 month' : (score >= 40 ? 'within 3 months' : 'routine'),
    disclaimer: 'This assessment is a heuristic analysis provided as a fallback and does not constitute medical diagnosis.'
  };
};
