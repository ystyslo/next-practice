import FlyingBubbles from "@/components/Bubbles/FlyingBubbles";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const textClass =
    "text-[40px] lg:text-[70px] font-semibold leading-none mb-4 sm:mb-10";
  return (
    <>
      <FlyingBubbles />
      <div className="h-screen flex justify-center items-center font-sans circles">
        <div className="flex flex-col gap-5 mx-7 sm:flex-row">
          <div className="relative w-82 sm:w-120 lg:w-142 h-57 sm:h-75 lg:h-97 max-w-full">
            <Image
              className="dark:invert object-contain"
              src="/home-woman.png"
              alt="Smiley woman in headphones"
              fill
              priority
            />
          </div>
          <div className="flex flex-col items-center sm:items-end">
            <p className={textClass}>Write Your</p>
            <p className={`${textClass} text-[var(--selection)]`}>Posts</p>
            <p className={textClass}>here</p>
            <Link href={"/authorization"}>
              <Button
                variant={"blueBtn"}
                className="w-28 md:w-48 h-12 md:h-16 rounded-full align-self-right shadow-[inset_0_0_0_1px_#D9D9D9]"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
