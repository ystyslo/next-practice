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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthUserStore";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/logInUser";

const formSchema = z.object({
  email: z.email("Введіть коректний email"),
  password: z
    .string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .regex(/[A-Z]/, "Пароль має містити хоча б одну велику літеру")
    .regex(/[a-z]/, "Пароль має містити хоча б одну малу літеру")
    .regex(/[0-9]/, "Пароль має містити хоча б одну цифру"),
});

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setHasAccount } = useAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await loginUser(values);
      alert("Login successful");
      setUser(user);
      router.push("/posts");
    } catch {
      form.setError("email", { message: "Невірний email або пароль" });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-92 bg-muted rounded-xl p-6 shadow-md"
      >
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
            Log in
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Clear
          </Button>
        </div>
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Don&#39;t have an account?{" "}
          <button
            onClick={() => setHasAccount(false)}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </div>
      </form>
    </Form>
  );
}
