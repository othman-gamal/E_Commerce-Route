"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { checkout } from "@/services/checkout.service";

type Props = {
  cartId: string;
};

export default function CheckoutModal({ cartId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const shippingAddress = {
      details: form.details.value,
      phone: form.phone.value,
      city: form.city.value,
    };

    try {
      const res = await checkout(cartId, shippingAddress);

      // ✅ redirect to payment gateway
      window.location.href = res.session.url;
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Proceed to Checkout
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-bold">
              Shipping Address
            </h2>

            <input
              name="details"
              placeholder="Address details"
              className="w-full border p-2 rounded"
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              className="w-full border p-2 rounded"
              required
            />

            <input
              name="city"
              placeholder="City"
              className="w-full border p-2 rounded"
              required
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Redirecting..." : "Pay Now"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}