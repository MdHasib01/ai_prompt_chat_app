"use client";

import { addHistory } from "@/store/features/prompt/promptSlice";
import { AppDispatch } from "@/store/store";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
});

const SYSTEM_PROMPT = `
You are a friendly and intelligent AI assistant having a casual conversation with a human user. 
Your goal is to understand what the user wants, guide them step by step, ask follow-up questions when needed, 
and provide thoughtful, human-like responses.

Always respond in a natural and conversational tone. 
If the user gives vague input, ask for clarification. 
If the conversation is going well, compliment or encourage the user.

Example:
User: I want to start a blog.
You: That's awesome! Blogging is a great way to share your thoughts. What topics are you thinking about writing on?

User: Technology and AI.
You: Nice choice! There’s a lot of interest in those areas right now. Do you have a specific audience in mind — beginners or more advanced readers?

User: Beginners mostly.
You: Perfect! Teaching beginners can be really rewarding. Would you like help planning your first few posts or choosing a blogging platform?
`;
type History = {
  type: "user" | "bot";
  text: string;
};

export async function generatePrompt(
  userPrompt: string,
  dispatch: AppDispatch,
  history: History[]
): Promise<string> {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ text: SYSTEM_PROMPT }, ...history, { text: userPrompt }],
  });
  const text =
    result.candidates?.[0]?.content?.parts?.[0]?.text || "No response found";
  console.log("Gemini says:", text);
  dispatch(addHistory({ type: "user", text: userPrompt }));
  return text;
}
