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
import { loginUser } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* ✅ ADDED IMPORTS */
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import VerifyOtpModal from "@/components/auth/VerifyOtpModal";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";

export default function Login() {
  const router = useRouter();

  /* ✅ ADDED STATES */
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values: loginSchemaType) {
    try {
      const data = await loginUser(values);

      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        router.push("/products");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <main className="container mx-auto relative">
      <div className="text-center">
        <h2 className="font-bold text-2xl my-5">Welcome to ShopMart 🛒</h2>
        <p className="text-lg">Login Now!</p>
      </div>

      <div className="w-full lg:max-w-2xl mx-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ ADDED FORGOT PASSWORD BUTTON */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setShowModal(true);
                  setStep("email");
                }}
                className="text-sm text-black underline hover:opacity-80"
              >
                Forgot password?
              </button>
            </div>

            <Button className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Spinner /> : "Login"}
            </Button>
          </form>
        </Form>
      </div>

      {/* ================================
          FORGOT PASSWORD MODAL
      ================================ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-xl text-black"
            >
              ×
            </button>

            {step === "email" && (
              <ForgotPasswordModal onSuccess={() => setStep("otp")} />
            )}

            {step === "otp" && (
              <VerifyOtpModal onSuccess={() => setStep("reset")} />
            )}

            {step === "reset" && <ResetPasswordModal />}
          </div>
        </div>
      )}
    </main>
  );
}
