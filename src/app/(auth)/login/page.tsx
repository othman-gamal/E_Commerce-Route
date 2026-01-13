"use client";
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
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, loginSchemaType } from "@/schema/auth.schema";
import { loginUser } from "@/survices/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function handleLogin(values: loginSchemaType) {
    const data = await loginUser(values);

    if (data.message == "success") {
      router.push("/products");
    }
  }
  return (
    <>
      <main className="container mx-auto">
        <div className="text-center">
          <h2 className="font-bold text-2xl my-5">Welcome to ShopMart 🛒</h2>
          <p className="text-lg">Login Now!</p>
        </div>
        <div className="w-full lg:max-w-2xl mx-auto p-6 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <FormLabel> Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full cursor-pointer">
                {form.formState.isSubmitting ? <Spinner /> : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}
