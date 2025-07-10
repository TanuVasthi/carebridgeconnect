
'use server';
/**
 * @fileOverview A flow for translating text using an AI model.
 *
 * - translateText - A function that handles the text translation.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateTextInputSchema = z.object({
  texts: z.array(z.string()).describe('An array of texts to translate.'),
  targetLanguage: z.string().describe('The target language code (e.g., "te" for Telugu, "hi" for Hindi).'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translations: z.record(z.string()).describe('An object mapping original text to translated text.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;


export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: { schema: TranslateTextInputSchema },
  output: { schema: TranslateTextOutputSchema },
  prompt: `Translate the following JSON array of English texts to the target language: {{targetLanguage}}.
Return a JSON object where keys are the original English strings and values are the translated strings.

Example:
Input: { "texts": ["Hello", "How are you?"], "targetLanguage": "fr" }
Output: { "translations": { "Hello": "Bonjour", "How are you?": "Comment ça va?" } }

Texts to translate:
{{jsonStringify texts}}
`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async (input) => {
    if (input.texts.length === 0) {
      return { translations: {} };
    }
    const { output } = await prompt(input);
    return output!;
  }
);
