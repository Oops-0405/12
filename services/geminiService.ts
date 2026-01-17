
import { GoogleGenAI } from "@google/genai";

export const getChatResponse = async (userMessage: string) => {
  try {
    // Re-initialize to ensure we have the most up-to-date API key context
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: "You are a professional sales assistant for Hangte Oil, a manufacturer of high-quality lubricants. Your goal is to answer customer questions about product categories (Automotive, Industrial, Marine), company reliability (25+ years experience, ISO certified), and encourage them to leave their contact information. Keep responses concise, professional, and helpful. If asked for language, note that we support English and Chinese.",
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that. Please contact our sales team directly at sales@hangteoil.com.";
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please reach us via our contact form on the Contact page.";
  }
};
