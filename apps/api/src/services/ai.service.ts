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
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620', // Latest stable
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
    // Fallback or rethrow
    throw new Error('Failed to analyze assessment data');
  }
};
