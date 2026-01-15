/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "@/services/orders.service";
import OrderCard from "@/components/ui/OrderCard";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await getUserOrders();
      setOrders(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No Orders Yet</h2>
        <p className="text-gray-500">You haven’t placed any orders.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
