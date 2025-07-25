import Image from "next/image";
import NavBar from "./NavBar";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex fixed top-0 left-0 right-0 justify-between items-center h-16 px-36">
      <Link href={"/"} className="h-[29px] w-[113px] relative ">
        <Image
          className="dark:invert object-contain"
          src="/RISEBLOG.svg"
          alt="Riseblog logo"
          fill
          priority
        />
      </Link>
      <NavBar />
    </div>
  );
}
