"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const linkBaseClass =
    "flex justify-center items-center h-full w-full font-sans font-medium text-sm";

  const activeClass =
    "font-semibold text-[var(--selection)] relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[var(--selection)]";
  const inactiveClass = "hover:text-[var(--selection)]";

  const links = [
    { href: "/", label: "Home" },
    { href: "/posts", label: "Posts" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];
  return (
    <div className="flex justify-between items-center w-2xs ml-5">
      {links.map(({ href, label }) => {
        const isActive = mounted && pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`${linkBaseClass} ${
              isActive ? activeClass : inactiveClass
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
