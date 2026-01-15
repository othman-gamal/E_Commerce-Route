"use client";

import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "@/services/wishlist.service";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function Wishlist() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const data = await getWishlist();
      setProducts(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeFromWishlist(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="text-black text-lg font-medium">
          Loading wishlist...
        </span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-black mb-8">Your Wishlist 🤍</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-60 object-cover rounded-t-2xl"
              />

              <div className="p-5">
                <h2 className="text-lg font-semibold text-black line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-gray-600 mt-2">{product.price} EGP</p>

                <button
                  onClick={() => handleRemove(product._id)}
                  className="mt-5 w-full border border-black text-black py-2 rounded-xl hover:bg-black hover:text-white transition-all duration-300"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
