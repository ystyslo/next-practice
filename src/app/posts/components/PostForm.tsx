"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { LogOut } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Тема поста має містити щонайменше 5 символів")
    .max(100, "Тема поста не може бути довше за 100 символів"),
  content: z
    .string()
    .min(10, "Текст поста має містити щонайменше 10 символів")
    .max(2000, "Текст поста не може бути довше за 2000 символів"),
});

export default function CreatePostForm({ username = "John Doe" }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const postData = {
      ...values,
      author: username,
      createdAt: new Date().toISOString(),
    };
    console.log(postData);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-muted rounded-xl p-6 shadow-md">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground">
              Create Your Post
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log("Logout clicked")}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Log out
            </Button>
          </div>
          <p className="text-muted-foreground">
            Share your thoughts with the community
          </p>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Posting as
          </label>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {username.charAt(0)}
              </span>
            </div>
            <span className="text-foreground font-medium">{username}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your post title..."
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts..."
                      className="min-h-[150px] text-base resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-4 pt-4">
              <Button
                type="submit"
                className="bg-[var(--selection)] hover:bg-blue-900 px-8"
              >
                Publish
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="px-8"
              >
                Clear
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
