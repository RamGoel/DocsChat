import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-neutral-800 rounded-bl-xl rounded-br-xl border-2 border-t-0 border-neutral-900 flex items-center justify-between p-4">
      <div>
        <Image alt="logo" src={"/image.png"} width={40} height={40} />
      </div>

      <p className="text-lg font-mono">
        DocsChat{" "}
        <span className="hidden md:inline">- Ask anything about your Docs</span>
      </p>
      <Link href={"https://github.com/RamGoel/DocsChat"}>
        <Github />
      </Link>
    </div>
  );
};

export default Header;
