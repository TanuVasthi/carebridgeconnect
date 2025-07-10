
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

// Define a more structured output schema for the AI model
const TranslationPairSchema = z.object({
  original: z.string().describe('The original English text.'),
  translation: z.string().describe('The translated text.'),
});

const StructuredTranslateOutputSchema = z.object({
  translations: z.array(TranslationPairSchema).describe('An array of translation pairs.'),
});


const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: { schema: z.object({ ...TranslateTextInputSchema.shape, jsonTexts: z.string() }) },
  output: { schema: StructuredTranslateOutputSchema },
  prompt: `Translate the following JSON array of English texts to the target language: {{targetLanguage}}.
Return a JSON object containing an array of "translations", where each element is an object with "original" and "translation" keys.

Example:
Input Texts: ["Hello", "How are you?"]
Target Language: "fr"
Output: { "translations": [{ "original": "Hello", "translation": "Bonjour" }, { "original": "How are you?", "translation": "Comment ça va?" }] }

Texts to translate:
{{{jsonTexts}}}
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
    const { output } = await prompt({
      ...input,
      jsonTexts: JSON.stringify(input.texts),
    });

    if (!output) {
      return { translations: {} };
    }

    // Convert the structured array back to the record format the app expects
    const translationsRecord: Record<string, string> = {};
    for (const pair of output.translations) {
        if(input.texts.includes(pair.original)) {
            translationsRecord[pair.original] = pair.translation;
        }
    }
    
    // Fill any missing translations with original text
    for (const text of input.texts) {
        if (!translationsRecord[text]) {
            translationsRecord[text] = text;
        }
    }

    return { translations: translationsRecord };
  }
);
