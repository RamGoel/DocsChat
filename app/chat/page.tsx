"use client";
import MessageCard from "@/components/MessageCard";
import Preset, { questions } from "@/components/Preset";
import { Message } from "@/types/message";
import { motion } from "framer-motion";
import { ChevronUp, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const ref = useRef(null);
  const [newMessageText, setNewMessageText] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    <div className="h-[88vh] flex flex-col">
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

      <div className="w-full flex-col h-[140px] flex items-center gap-2 justify-center">
        <div className=" w-11/12 lg:w-3/4">
          {messages.length > 0 ? (
            <motion.div
              className="relative"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              onMouseEnter={() => setShowSuggestions(true)}
              onMouseLeave={() => setShowSuggestions(false)}
            >
              {showSuggestions ? (
                <div className="absolute bottom-[40px] rounded-lg overflow-hidden flex flex-col w-fit bg-neutral-800">
                  {questions.map((item, index) => (
                    <motion.button
                      onClick={() => {
                        handleMessageSend(item.text);
                        setShowSuggestions(false);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center text-sm gap-2 p-3 cursor-pointer hover:bg-neutral-900"
                      key={item.id}
                    >
                      {item.icon}
                      <p>{item.text}</p>
                    </motion.button>
                  ))}
                </div>
              ) : null}
              <button className="p-2 border-[5px] border-transparent font-mono text-xs w-fit border-b-2 border-b-neutral-900 cursor-pointer rounded-t-2xl flex items-center gap-1 px-4 hover:opacity-70 transition-all bg-neutral-800">
                Show Suggestions <ChevronUp size={12} />
              </button>
            </motion.div>
          ) : null}
          <div
            className={`bg-neutral-800 shadow-2xl shadow-violet-500/20 flex items-center p-2 pl-5 ${messages.length > 0 ? "rounded-b-2xl" : "rounded-full"}`}
          >
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
    </div>
  );
}
