"use client";

import { X, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BurgerMenu({ isOpen, onClose }: BurgerMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/posts", label: "Posts" },
    { href: "/about", label: "About" },
    { href: "/account", label: <User2Icon /> },
  ];

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu-root"
      className="fixed top-0 left-0 w-full h-full bg-secondary dark:bg-gray-900 z-50 md:hidden flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center flex-1 gap-8 p-6">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={handleLinkClick}
              className={`flex items-center justify-center space-x-3 p-4 w-full max-w-xs rounded-lg text-lg font-medium transition-colors ${
                isActive
                  ? "bg-opacity-10 text-[var(--selection)] font-semibold"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
