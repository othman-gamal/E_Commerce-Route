/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cartService } from "@/services/cart.service";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/ui/CheckoutModal";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const res = await cartService.getCart();
      setCart(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id: string) {
    await cartService.removeItem(id);
    fetchCart();
  }

  async function updateQty(id: string, count: number) {
    if (count < 1) return;
    await cartService.updateQuantity(id, count);
    fetchCart();
  }

  async function clearCart() {
    await cartService.clearCart();
    fetchCart();
  }

  if (loading) return <p className="p-6">Loading cart...</p>;
  if (!cart) return <p className="p-6">Cart is empty</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.products.map((item: any) => (
        <div
          key={item.product._id}
          className="flex gap-4 items-center border p-4 mb-4"
        >
          <Image
            src={item.product.imageCover}
            alt={item.product.title}
            width={100}
            height={100}
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.product.title}</h3>
            <p>EGP {item.price}</p>

            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                onClick={() => updateQty(item.product._id, item.count - 1)}
              >
                -
              </Button>

              <span>{item.count}</span>

              <Button
                size="sm"
                onClick={() => updateQty(item.product._id, item.count + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={() => removeItem(item.product._id)}
          >
            Remove
          </Button>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: EGP {cart.totalCartPrice}</h2>

        <div className="flex gap-3">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>

          <CheckoutModal cartId={cart._id} />
        </div>
      </div>
    </div>
  );
}
