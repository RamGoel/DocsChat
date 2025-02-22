import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex max-w-3/4 items-center flex-col gap-4">
        <div className="w-[110px] h-[110px] bg-white rounded-full p-5 flex items-center justify-center">
          <Image
            alt="loggo"
            src={"/image.png"}
            className="object-contain w-[100px] h-[100px]"
            width={100}
            height={100}
          />
        </div>{" "}
        <h1 className="text-6xl font-semibold">Ask your Documentation</h1>
        <p className="w-3/4 text-center">
          DocsChat, a RAG layer on top of your docs. You can clone the
          repository, replace the content of <code>public/docs.txt</code>, with
          your docs, self host and use this.
        </p>
        <Link href={"/chat"}>
          <button className="bg-white text-black px-3 py-2 rounded-lg flex items-center gap-2  hover:scale-90 transition-all">
            Try Demo <ArrowUpRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
