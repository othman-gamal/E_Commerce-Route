"use client";

import { useState } from "react";
import { verifyResetCode } from "@/services/password.service";

export default function VerifyOtpModal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    try {
      await verifyResetCode(code);
      onSuccess();
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-bold text-black">Verify Code</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full border p-3 rounded-xl"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={handleVerify}
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        Verify
      </button>
    </div>
  );
}
