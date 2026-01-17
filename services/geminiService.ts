
import { GoogleGenAI } from "@google/genai";

export const getChatResponse = async (userMessage: string) => {
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || '';
  
  if (!apiKey) {
    return "AI Features are currently disabled (API Key missing). Please use the contact form.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: "You are a professional sales assistant for Hangte Oil, a manufacturer of high-quality lubricants. Your goal is to answer customer questions about product categories (Automotive, Industrial, Marine), company reliability (25+ years experience, ISO certified), and encourage them to leave their contact information. Keep responses concise, professional, and helpful.",
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting right now. Please reach us via our contact form.";
  }
};
