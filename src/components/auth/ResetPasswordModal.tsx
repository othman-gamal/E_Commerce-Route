"use client";

import { useState } from "react";
import { changePassword } from "@/services/password.service";

export default function ResetPasswordModal() {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleReset = async () => {
    if (password !== rePassword) {
      return alert("Passwords do not match");
    }

    try {
      await changePassword(password, rePassword);
      alert("Password changed successfully ✅");
    } catch {
      alert("Failed to change password");
    }
  };

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-bold text-black">Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        className="w-full border p-3 rounded-xl"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm password"
        className="w-full border p-3 rounded-xl"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        Change Password
      </button>
    </div>
  );
}
