"use client";
import MessageCard from "@/components/MessageCard";
import Preset from "@/components/Preset";
import { Message } from "@/types/message";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const ref = useRef(null);
  const [newMessageText, setNewMessageText] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  // when new message adds, auto scroll the chat
  useEffect(() => {
    if (ref.current) {
      (ref.current as HTMLDivElement)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // handles fetching of response
  const handleMessageSend = async (overWriteMessage?: string) => {
    const userMessage: Message = {
      id: String(messages.length + 1),
      text: overWriteMessage ?? newMessageText,
      timestamp: new Date(),
      type: "user",
    };

    setMessages((old) => [...old, userMessage]);
    setNewMessageText("");
    setLoading(true);

    const response = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({
        query: overWriteMessage ?? newMessageText,
      }),
    });

    const parsedResponse = await response.json();
    const botMessageText = parsedResponse.response;

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
      {messages.length ? (
        <div
          id="message-box"
          className="flex-1 mobile-scrollbar overflow-y-auto gap-3 flex flex-col p-5"
        >
          {messages.map((item) => {
            return <MessageCard key={item.id} message={item} />;
          })}

          {isLoading ? (
            <div className=" w-fit px-4 bg-neutral-700 gap-1 min-h-[40px] flex items-center justify-center rounded-full rounded-bl-none">
              <Loader2 size={17} className="animate-spin" />{" "}
            </div>
          ) : null}
          <div ref={ref} />
        </div>
      ) : (
        <Preset
          onOptionClick={(val) => {
            handleMessageSend(val);
          }}
        />
      )}

      <div className="w-full h-[120px] flex items-center justify-center">
        <div className="bg-neutral-800 shadow-2xl shadow-violet-500/20 flex items-center w-11/12 lg:w-3/4 p-2 pl-5 rounded-full">
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
          <button
            onClick={() => handleMessageSend()}
            disabled={isLoading || newMessageText.length === 0}
            className="min-w-[40px] disabled:opacity-50 h-[40px] rounded-full bg-neutral-900 hover:bg-neutral-700 transition-all flex items-center justify-center"
          >
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
