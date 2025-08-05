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
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const formSchema = z.object({
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

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setHasAccount } = useAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("You logged in successfully!");
      console.log("AUTH_SECRET:", process.env.AUTH_SECRET);
      router.push("/posts");
    } else {
      form.setError("email", { message: "Incorrect e-mail or password" });
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
