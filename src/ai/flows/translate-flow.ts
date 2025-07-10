'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateTextInputSchema = z.object({
  texts: z.array(z.string()).min(1, 'Provide at least one text.'),
  targetLanguage: z.string().describe('Target language code (e.g., "hi" for Hindi)'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translations: z.record(z.string(), z.string()).describe('Map from original to translated text.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

// Structured model output
const TranslationPairSchema = z.object({
  original: z.string(),
  translation: z.string(),
});
const StructuredTranslateOutputSchema = z.object({
  translations: z.array(TranslationPairSchema),
});

// Define the AI prompt
const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: z.object({
    texts: z.array(z.string()),
    targetLanguage: z.string(),
    jsonTexts: z.string(),
  }),
  output: StructuredTranslateOutputSchema,
  prompt: `Translate the following JSON array of English texts to the target language: {{targetLanguage}}.
Return a JSON object with a "translations" array of objects each having "original" and "translation".

Example:
Input: ["Hello", "Good night"]
Target: "hi"
Output: {
  "translations": [
    { "original": "Hello", "translation": "नमस्ते" },
    { "original": "Good night", "translation": "शुभ रात्रि" }
  ]
}

Translate:
{{{jsonTexts}}}
`,
});

// Main flow
export const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      ...input,
      jsonTexts: JSON.stringify(input.texts),
    });

    const translationsRecord: Record<string, string> = {};
    for (const pair of output?.translations || []) {
      if (input.texts.includes(pair.original)) {
        translationsRecord[pair.original] = pair.translation;
      }
    }

    // Ensure all inputs are returned, even untranslated
    for (const text of input.texts) {
      if (!translationsRecord[text]) {
        translationsRecord[text] = text;
      }
    }

    return { translations: translationsRecord };
  }
);
