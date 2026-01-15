"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  path: string; // FULL PATH
  name: string;
  image: string;
};

export default function ItemCard({ path, name, image }: Props) {
  return (
    <Link
      href={path}
      className="border rounded-lg p-4 hover:shadow-lg transition"
    >
      <Image
        src={image}
        alt={name}
        width={300}
        height={200}
        className="w-full h-40 object-contain"
      />
      <h3 className="mt-4 text-center font-semibold">{name}</h3>
    </Link>
  );
}
