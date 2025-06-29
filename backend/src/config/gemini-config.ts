import { GoogleGenerativeAI } from "@google/generative-ai";

export const configureGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
};
