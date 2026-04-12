import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

export async function POST(request:Request) {
    const body = await request.json();
  const response = await ai.models.generateContent({
    model: "gemma-4-31b-it",
    contents: [
      {
        role:"user",
        parts:[{text:body.message}]
      }
    ],
  });
  return NextResponse.json({
    reply:response.text
  })
}