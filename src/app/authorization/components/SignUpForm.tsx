"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthUserStore";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/services/userAPI";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Імʼя користувача має містити щонайменше 2 символи")
    .max(20, "Імʼя користувача не може бути довше за 20 символів"),
  email: z.email("Неправильний формат email"),
  password: z
    .string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .regex(/[A-Z]/, "Пароль має містити хоча б одну велику літеру")
    .regex(/[a-z]/, "Пароль має містити хоча б одну малу літеру")
    .regex(/[0-9]/, "Пароль має містити хоча б одну цифру"),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setHasAccount } = useAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await registerUser(values);
      alert("Registration successful");
      setUser(user);
      router.push("/posts");
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "field" in err &&
        "message" in err
      ) {
        form.setError(
          (err as { field: "username" | "email"; message: string }).field,
          { message: (err as { message: string }).message }
        );
      } else if (err instanceof Error) {
        form.setError("username", { message: err.message });
      } else {
        form.setError("username", { message: "Щось пішло не так" });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-92 bg-white/80 rounded-xl p-6 shadow-md"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center gap-4 pt-4">
          <Button
            type="submit"
            className="bg-[var(--selection)] hover:bg-blue-900"
          >
            Sign up
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Clear
          </Button>
        </div>
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => setHasAccount(true)}
            className="text-blue-600 hover:underline"
          >
            Log in
          </button>
        </div>
      </form>
    </Form>
  );
}
