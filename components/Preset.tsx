import { motion } from "framer-motion";
import { HelpCircle, ListCheck, MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
export const questions = [
  {
    id: 1,
    icon: <MessageCircleQuestion />,
    text: "What is DocsChat?",
  },
  {
    id: 2,
    icon: <HelpCircle />,
    text: "List all the usecases?",
  },
  {
    id: 3,
    icon: <ListCheck />,
    text: "How to setup DocsChat for myself?",
  },
];

const Preset = ({
  onOptionClick,
}: {
  onOptionClick: (query: string) => void;
}) => {
  return (
    <div className="flex-1 flex items-center mx-auto justify-center">
      <div className="flex gap-4 flex-col items-center w-full">
        <div className="w-[110px] h-[110px] bg-white rounded-full p-5 flex items-center justify-center">
          <Image
            alt="loggo"
            src={"/image.png"}
            className="object-contain w-[100px] h-[100px]"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-xl ">Try asking one of these questions</h1>

        <motion.div
          className="flex items-center flex-wrap justify-center gap-3"
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
        >
          {questions.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => onOptionClick(item.text)}
              className="bg-amber-600/30 text-sm flex items-center gap-2 border-2 border-amber-600 text-amber-600 hover:scale-95 transition-all cursor-pointer py-2 px-4 rounded-full text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {item.icon}
              <p>{item.text}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Preset;
