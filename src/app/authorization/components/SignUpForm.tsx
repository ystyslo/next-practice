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
import { registerUser } from "@/lib/services/userAPI";
import { toast } from "sonner";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(20, "Username must be no longer than 20 characters"),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /^[A-Za-z0-9]*$/,
      "Password must contain only Latin letters and digits"
    ),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setHasAccount } = useAuthStore();
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
      await registerUser(values);
      setHasAccount(true);
      toast.success("Registration successful");
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
        form.setError("username", { message: "Something went wrong" });
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
                <Input placeholder="John Doe" autoComplete="on" {...field} />
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
                <Input
                  placeholder="john.doe@gmail.com"
                  autoComplete="on"
                  {...field}
                />
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                    className="pr-10"
                    autoComplete="off"
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
