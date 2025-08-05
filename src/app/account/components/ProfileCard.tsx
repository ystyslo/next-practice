"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Pencil, UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfileCard() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md bg-white/70 backdrop-blur rounded-2xl shadow-xl px-10 py-14">
      <UserCircle2 className="w-24 h-24 text-gray-700 mb-6" />

      <h2 className="text-xl font-semibold mb-1">{user?.username}</h2>
      <p className="text-sm text-gray-600 mb-8">{user?.email}</p>

      <div className="flex flex-col gap-4 w-full">
        <Button
          variant={"blueBtn"}
          className="flex items-center justify-center gap-2 py-2 rounded-xl"
        >
          <Pencil className="w-4 h-4" />
          Edit Profile
        </Button>
        <Button
          variant={"outline"}
          className="flex items-center justify-center gap-2 py-2 rounded-xl"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
