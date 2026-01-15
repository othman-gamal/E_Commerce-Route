const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

/* ================================
   HELPERS
================================ */
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

/* ================================
   FORGOT PASSWORD
================================ */
export const forgotPassword = async (email: string) => {
  const res = await fetch(`${BASE_URL}/auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Failed to send reset email");
  }

  return res.json();
};

/* ================================
   VERIFY RESET CODE (OTP)
================================ */
export const verifyResetCode = async (resetCode: string) => {
  const res = await fetch(`${BASE_URL}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resetCode }),
  });

  if (!res.ok) {
    throw new Error("Invalid reset code");
  }

  return res.json();
};

/* ================================
   CHANGE PASSWORD (LOGGED USER)
================================ */
export const changePassword = async (password: string, rePassword: string) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
    body: JSON.stringify({
      password,
      rePassword,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to change password");
  }

  return res.json();
};
