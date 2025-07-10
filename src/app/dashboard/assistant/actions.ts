"use server";

import { smartHealthAssistant, type SmartHealthAssistantInput } from "@/ai/flows/smart-health-assistant-flow";
import { z } from "zod";

const inputSchema = z.string().min(1, "Query cannot be empty.");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY or GOOGLE_API_KEY environment variable is not set.");
}

export async function getSmartHealthResponse(query: string) {
  try {
    const validatedQuery = inputSchema.parse(query);
    const input: SmartHealthAssistantInput = { query: validatedQuery };
    const response = await smartHealthAssistant(input);
    return response;
  } catch (error) {
    console.error("Error in getSmartHealthResponse:", error);
    if (error instanceof z.ZodError) {
      return { response: "Invalid input. Please provide a valid question." };
    }
    return { response: "An unexpected error occurred while processing your request." };
  }
}
