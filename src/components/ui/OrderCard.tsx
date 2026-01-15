/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function OrderCard({ order }: { order: any }) {
  return (
    <div className="border rounded-lg p-5 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-semibold">Order #{order._id.slice(-6)}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2">
          <Badge variant={order.isPaid ? "default" : "destructive"}>
            {order.isPaid ? "Paid" : "Not Paid"}
          </Badge>

          <Badge variant={order.isDelivered ? "default" : "outline"}>
            {order.isDelivered ? "Delivered" : "Pending"}
          </Badge>
        </div>
      </div>

      {/* Products */}
      <div className="space-y-3">
        {order.cartItems.map((item: any) => (
          <div
            key={item.product._id}
            className="flex gap-4 items-center border-b pb-3"
          >
            <Image
              src={item.product.imageCover}
              alt={item.product.title}
              width={70}
              height={70}
              className="rounded"
            />

            <div className="flex-1">
              <p className="font-medium">{item.product.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.count}</p>
            </div>

            <p className="font-semibold">EGP {item.price}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <p className="font-bold text-lg">Total: EGP {order.totalOrderPrice}</p>

        <p className="text-sm text-gray-500">
          Payment: {order.paymentMethodType}
        </p>
      </div>
    </div>
  );
}
