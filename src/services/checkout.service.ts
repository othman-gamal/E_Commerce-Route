/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function checkout(cartId: string, shippingAddress: any) {
  const res = await fetch(
    `${BASE_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token") || "",
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Checkout failed");
  }

  return res.json();
}
