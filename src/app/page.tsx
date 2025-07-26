import FlyingBubbles from "@/components/Bubbles/FlyingBubbles";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const textClass = "text-[90px] font-semibold leading-none mb-4";
  return (
    <>
      <FlyingBubbles />
      <div className="h-screen flex justify-center items-center font-sans circles">
        <div className="flex">
          <div className="relative w-142 h-97 max-w-full">
            <Image
              className="dark:invert object-contain"
              src="/home-woman.svg"
              alt="Smiley woman in headphones"
              fill
              priority
            />
          </div>
          <div className="flex flex-col items-end">
            <p className={textClass}>Write Your</p>
            <p className={`${textClass} text-[var(--selection)]`}>Posts</p>
            <p className={textClass}>here</p>
            <Link href={"/authorization"}>
              <button className="bg-[var(--selection)] w-48 h-16 rounded-full align-self-right text-[var(--background)] shadow-[inset_0_0_0_1px_#D9D9D9] active:bg-blue-900">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
