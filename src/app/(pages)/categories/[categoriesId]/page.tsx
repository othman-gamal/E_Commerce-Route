import { CategoryI } from "@/interfaces/categories";
import Image from "next/image";
// import { Item } from '@/types/item';

type Props = {
  params: { categoriesId: string };
};

export default async function CategoryDetailsPage({ params }: Props) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${params.categoriesId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  const json = await res.json();
  const category: CategoryI = json.data;
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  return (
    <div className="container mx-auto p-6 text-center">
      <Image
        src={category.image}
        alt={category.name}
        width={400}
        height={300}
        className="mx-auto"
      />

      <h1 className="text-3xl font-bold mt-6">{category.name}</h1>
      <p className="text-gray-500 mt-2">Slug: {category.slug}</p>
    </div>
  );
}
