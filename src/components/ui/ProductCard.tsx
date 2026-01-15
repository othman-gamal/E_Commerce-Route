"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductI } from "@/interfaces/product";
import { cartService } from "@/services/cart.service";
import { addToWishlist } from "@/services/wishlist.service"; // ✅ ADDED
import { useState } from "react"; // ✅ ADDED

type Props = {
  product: ProductI;
};

export default function ProductCard({ product }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false); // ✅ ADDED

  /* =========================
     ADD TO CART
  ========================== */
  const handleAddToCart = async () => {
    try {
      const res = await cartService.addToCart(product._id);
      console.log("Added to cart", res);
      alert("Product added to cart ✅");
    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

  /* =========================
     ADD TO WISHLIST
  ========================== */
  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(product._id);
      setIsWishlisted(true);
      alert("Added to wishlist 🤍");
    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

  return (
    <Card className="p-2 relative">
      {/* ❤️ Wishlist Icon */}
      <button
        onClick={handleAddToWishlist}
        className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <Heart
          className={isWishlisted ? "text-black fill-red-500" : "text-black"}
        />
      </button>

      <Link href={`/products/${product._id}`}>
        <Image
          width={1000}
          height={1000}
          src={product.imageCover}
          alt={product.title}
          className="w-full object-cover h-90"
        />

        <CardHeader>
          <h4 className="text-gray-400">{product.brand.name}</h4>

          <CardTitle className="text-xl font-bold">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </CardTitle>

          <CardDescription>{product.category.name}</CardDescription>

          <p className="flex gap-1 pt-2">
            {[...Array(5)].map((_, index) => {
              const filled = index < Math.floor(product.ratingsAverage);
              return (
                <Star
                  key={index}
                  className={
                    filled
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400 fill-gray-400"
                  }
                />
              );
            })}
            <span className="ms-5">({product.ratingsAverage})</span>
          </p>
        </CardHeader>

        <CardContent>
          <p className="text-black font-bold text-lg">EGP {product.price}</p>
        </CardContent>
      </Link>

      <CardFooter className="gap-3">
        <Button className="grow" onClick={handleAddToCart}>
          <ShoppingCart />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
