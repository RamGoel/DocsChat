import { Message } from "@/types/message";
import Markdown from "react-markdown";

const MessageCard = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex gap-2 justify-center flex-col ${message.type === "user" ? "items-end" : ""}`}
    >
      <div
        className={`p-4 rounded-lg max-w-[90%] lg:max-w-[60%] text-sm w-fit ${message.type === "user" ? "bg-blue-600" : "bg-neutral-700"} text-white`}
      >
        <Markdown
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl font-bold" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-semibold" {...props} />
            ),
            a: ({ ...props }) => (
              <a className="text-blue-500 underline" {...props} />
            ),
            code: ({ ...props }) => (
              <code className="bg-neutral-800 rounded-lg p-1" {...props} />
            ),
            pre: ({ ...props }) => (
              <pre
                className="bg-gray-900 break-all text-white p-4 rounded-md overflow-x-auto"
                {...props}
              />
            ),
            ul: ({ ...props }) => <ul className="list-disc" {...props} />,
            li: ({ ...props }) => <li className="ml-4" {...props} />,
            br: () => null,
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

export default MessageCard;
