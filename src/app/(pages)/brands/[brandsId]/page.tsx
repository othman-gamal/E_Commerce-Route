import { BrandI } from "@/interfaces/brand";
import Image from "next/image";
// import { Item } from '@/types/item';

type Props = {
  params: { brandsId: string };
};

export default async function BrandDetailsPage({ params }: Props) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${params.brandsId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch brand");
  }

  const json = await res.json();
  const brand: BrandI = json.data;

  return (
    <div className="container mx-auto p-6 text-center">
      <Image
        src={brand.image}
        alt={brand.name}
        width={400}
        height={300}
        className="mx-auto"
      />

      <h1 className="text-3xl font-bold mt-6">{brand.name}</h1>
      <p className="text-gray-500 mt-2">Slug: {brand.slug}</p>
    </div>
  );
}
