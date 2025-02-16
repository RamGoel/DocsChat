"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  type: "bot" | "user";
}

const genAI = new GoogleGenerativeAI("AIzaSyDp5TsCQSxEauWBzoEmszJ846Lrj5hze1o");

const SYSTEM_PROMPT = `
  You are an expert in reading and understanding documentation of APIs. If anyone ask you about anything you can efficiently read, understand and respond to the user query. You are handling customer support at CrustData which is part of Ycombinator S24. You must only return the response in less words (but proper spacing and formatting) unless there is no choice other than giving large responses. For any code related questions etc, you must provide proper code snippets with proper formatting so that user can use them right away. if there is any api example, you must provide the CURL for that.
`;

const getGeminiResponse = async (query: string) => {
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

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "message1",
      text: "How's it going?",
      timestamp: new Date(),
      type: "bot",
    },
  ]);
  const ref = useRef(null);
  const [newMessageText, setNewMessageText] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (ref.current) {
      (ref.current as HTMLDivElement)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleMessageSend = async () => {
    const userMessage: Message = {
      id: String(messages.length + 1),
      text: newMessageText,
      timestamp: new Date(),
      type: "user",
    };

    setMessages((old) => [...old, userMessage]);
    setNewMessageText("");
    setLoading(true);

    const botMessageText = await getGeminiResponse(newMessageText);

    const botMesage: Message = {
      id: String(messages.length) + 2,
      text: botMessageText || "",
      timestamp: new Date(),
      type: "bot",
    };

    setMessages((old) => [...old, botMesage]);
    setLoading(false);
  };
  return (
    <div className="h-screen flex flex-col">
      <div className="w-[60%] bg-neutral-800 rounded-bl-xl rounded-br-xl border-2 border-t-0 border-neutral-900 flex items-center justify-between mx-auto p-4">
        <h1 className="text-2xl">CrustChat</h1>

        <p>Ask me anything about Crusdata APIs</p>
      </div>
      <div
        id="message-box"
        className="flex-1 mobile-scrollbar overflow-y-auto gap-3 flex flex-col w-[60%] mx-auto p-5"
      >
        {messages.map((item) => {
          return <MessageCard key={item.id} message={item} />;
        })}
        <div ref={ref} />
      </div>

      <div className="w-full h-[120px] flex items-center justify-center">
        <div className="bg-neutral-800 shadow-2xl shadow-violet-500/20 flex items-center w-1/3 p-2 pl-5 rounded-full">
          <input
            className="bg-transparent border-none placeholder:opacity-60 h-[40px] w-full ring-0 focus-visible:outline-none"
            value={newMessageText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleMessageSend();
              }
            }}
            placeholder="Ask me anything "
            onChange={(e) => setNewMessageText(e.target.value)}
          />
          <button className="min-w-[40px] h-[40px] rounded-full bg-neutral-900 hover:bg-neutral-700 transition-all flex items-center justify-center">
            {isLoading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Send size={17} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const MessageCard = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex gap-2 justify-center flex-col ${message.type === "user" ? "items-end" : ""}`}
    >
      <div
        className={`p-4 rounded-lg max-w-[60%] text-sm w-fit ${message.type === "user" ? "bg-blue-600" : "bg-neutral-700"} text-white`}
      >
        <Markdown
          components={{
            h1: ({ _, ...props }) => (
              <h1 className="text-3xl font-bold" {...props} />
            ),
            h2: ({ _, ...props }) => (
              <h2 className="text-2xl font-semibold" {...props} />
            ),
            a: ({ _, ...props }) => (
              <a className="text-blue-500 underline" {...props} />
            ),
            code: ({ _, ...props }) => (
              <code className="bg-neutral-800 rounded-lg p-1" {...props} />
            ),
            pre: ({ _, ...props }) => (
              <pre
                className="bg-gray-900 break-all text-white p-4 rounded-md overflow-x-auto"
                {...props}
              />
            ),
          }}
          className={"whitespace-pre-wrap leading-relaxed font-sans"}
        >
          {message.text}
        </Markdown>
      </div>
      <p className="text-xs opacity-70">
        {new Date(message.timestamp).getHours()}:
        {new Date(message.timestamp).getMinutes()}
      </p>
    </div>
  );
};
