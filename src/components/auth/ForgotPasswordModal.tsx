"use client";

import { useState } from "react";
import { forgotPassword } from "@/services/password.service";

export default function ForgotPasswordModal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await forgotPassword(email);
      onSuccess();
    } catch (err) {
      alert("Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-bold text-black">Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border p-3 rounded-xl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </div>
  );
}
