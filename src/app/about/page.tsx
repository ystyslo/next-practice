import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex justify-center items-center py-40 px-10 font-sans ovals">
      <div className="max-w-4xl w-full space-y-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          👋 Hi, I&apos;m Yurii Styslo
        </h1>
        <p className="text-lg text-gray-700">
          A passionate Fullstack Developer with a love for clean UI, scalable
          architecture, and building meaningful user experiences.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/YuriiStyslo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-800 hover:text-black"
          >
            <Github /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yurii-styslo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-800 hover:text-black"
          >
            <Linkedin /> LinkedIn
          </a>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900">
            🧠 About this project
          </h2>
          <p className="text-gray-700 text-base">
            This is a functional blog platform where users can sign in, create
            posts, and engage in discussions through comments. It’s designed to
            be clean, performant, and easily scalable.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900">
            🛠️ Tech Stack
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-gray-700 text-base">
            <li>
              <strong>Next.js</strong> – Framework for building fast and
              scalable fullstack React apps.
            </li>
            <li>
              <strong>NextAuth.js</strong> – Seamless authentication using
              providers like GitHub, Google, etc.
            </li>
            <li>
              <strong>Tailwind CSS</strong> – Utility-first CSS framework for
              rapid UI development.
            </li>
            <li>
              <strong>Zustand</strong> – Lightweight and scalable state
              management for React.
            </li>
            <li>
              <strong>shadcn/ui</strong> – Beautifully designed accessible
              component library built on Radix UI.
            </li>
            <li>
              <strong>Lucide Icons</strong> – Clean and consistent icons for
              elegant UIs.
            </li>
            <li>
              <strong>React Hook Form + Zod</strong> – Form management with
              strong validation and minimal re-renders.
            </li>
            <li>
              <strong>Prisma ORM</strong> – Type-safe DB access layer used with
              PostgreSQL hosted on Neon.
            </li>
          </ul>
        </div>

        <div className="pt-12">
          <Button size="lg" variant={"blueBtn"}>
            <Link href="/" className="px-6 py-3 font-medium">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
