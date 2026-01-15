import { jwtDecode } from "jwt-decode";
/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

function getUserId() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded: any = jwtDecode(token);
  return decoded.id;
}

export async function getUserOrders() {
  const userId = getUserId();
  if (!userId) throw new Error("User not logged in");

  const res = await fetch(`${BASE_URL}/orders/user/${userId}`, {
    headers: {
      token: localStorage.getItem("token") || "",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}
