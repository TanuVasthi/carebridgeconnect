// 'use server';

/**
 * @fileOverview A smart health assistant AI agent.
 *
 * - smartHealthAssistant - A function that handles health-related questions.
 * - SmartHealthAssistantInput - The input type for the smartHealthAssistant function.
 * - SmartHealthAssistantOutput - The return type for the smartHealthAssistant function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartHealthAssistantInputSchema = z.object({
  query: z.string().describe('The health-related question from the user.'),
});
export type SmartHealthAssistantInput = z.infer<typeof SmartHealthAssistantInputSchema>;

const SmartHealthAssistantOutputSchema = z.object({
  response: z.string().describe('The specific and helpful guidance from the Smart Health Assistant.'),
});
export type SmartHealthAssistantOutput = z.infer<typeof SmartHealthAssistantOutputSchema>;

export async function smartHealthAssistant(input: SmartHealthAssistantInput): Promise<SmartHealthAssistantOutput> {
  return smartHealthAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartHealthAssistantPrompt',
  input: {schema: SmartHealthAssistantInputSchema},
  output: {schema: SmartHealthAssistantOutputSchema},
  prompt: `You are a Smart Health Assistant, providing specific and helpful guidance to users answering their health-related questions.

  User's Question: {{{query}}}
  `,
});

const smartHealthAssistantFlow = ai.defineFlow(
  {
    name: 'smartHealthAssistantFlow',
    inputSchema: SmartHealthAssistantInputSchema,
    outputSchema: SmartHealthAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
