"use client";

import Image from "next/image";
import NavBar from "./NavBar";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const [isBurgerMenuShown, setIsBurgerMenuShown] = useState(false);

  const handleCloseBurgerMenu = () => {
    setIsBurgerMenuShown(false);
  };

  const handleOpenBurgerMenu = () => {
    setIsBurgerMenuShown(true);
  };

  return (
    <>
      <div className="flex fixed top-0 left-0 right-0 justify-around items-center h-16 dark:bg-gray-900 z-40">
        <Link href={"/"} className="h-[29px] w-[113px] relative">
          <Image
            className="dark:invert object-contain"
            src="/RISEBLOG.svg"
            alt="Riseblog logo"
            fill
            priority
          />
        </Link>
        <NavBar />
        <button
          className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
          onClick={handleOpenBurgerMenu}
          aria-label="Open menu"
        >
          <MenuIcon size={20} />
        </button>
      </div>
      <BurgerMenu isOpen={isBurgerMenuShown} onClose={handleCloseBurgerMenu} />
    </>
  );
}
