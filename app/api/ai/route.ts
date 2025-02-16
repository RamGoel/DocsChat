import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const SYSTEM_PROMPT = `
You are an expert in reading and understanding documentation of APIs. If anyone ask you about anything you can efficiently read, understand and respond to the user query. You are handling customer support at CrustData which is part of Ycombinator S24. You must only return the response in less words (but proper spacing and formatting) unless there is no choice other than giving large responses. For any code related questions etc, you must provide proper code snippets with proper formatting so that user can use them right away. if there is any api example, you must provide the CURL for that.
`;

const getGeminiResponse = async (query: string) => {
  if (!process.env.GOOGLE_KEY) {
    throw new Error("AI Model key Missing, Please self host");
  }
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_KEY || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const filePath = path.join(process.cwd(), "public", "docs.txt");

  console.log(filePath);

  const fileContent = await fs.readFile(filePath, "utf-8");

  console.log(fileContent);

  const PROMPT = `
      The user is trying to understand CrustData and have a query: ${query} \n

      You have to read the documentation and reply to the user.

      Here is the documentation:
      ${fileContent}
    `;
  const modelResponse = await model.generateContent(PROMPT);
  const response = modelResponse.response.text();
  return response;
};

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const response = await getGeminiResponse(query);

    return NextResponse.json({ response });
  } catch ({ message }: { message: string }) {
    return NextResponse.json({ response: message }, { status: 500 });
  }
}
