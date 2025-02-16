import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_KEY || "");

const SYSTEM_PROMPT = `
  You are an expert in reading and understanding documentation of APIs. If anyone ask you about anything you can efficiently read, understand and respond to the user query. You are handling customer support at CrustData which is part of Ycombinator S24. You must only return the response in less words (but proper spacing and formatting) unless there is no choice other than giving large responses. For any code related questions etc, you must provide proper code snippets with proper formatting so that user can use them right away. if there is any api example, you must provide the CURL for that.
`;

export const getGeminiResponse = async (query: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const docs = await fetch("/docs.txt")
      .then((response) => response.text())
      .then((text) => text)
      .catch((error) => console.error("Error reading file:", error));

    const PROMPT = `
      The user is trying to understand CrustData and have a query: ${query} \n

      You have to read the documentation and reply to the user.

      Here is the documentation:
      ${docs}
    `;
    const modelResponse = await model.generateContent(PROMPT);
    const response = modelResponse.response.text();
    return response;
  } catch (err) {
    console.log(err);
  }
};
