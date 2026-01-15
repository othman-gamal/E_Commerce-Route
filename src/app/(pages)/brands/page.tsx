import ItemCard from "@/components/ui/itemCard";
import { BrandI } from "@/interfaces/brand";
// import { Item } from '@/types/item';

export default async function BrandsPage() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }

  const json = await res.json();
  const brands: BrandI[] = json.data;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Brands</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <ItemCard
            key={brand._id}
            path={`/brands/${brand._id}`}
            name={brand.name}
            image={brand.image}
          />
        ))}
      </div>
    </div>
  );
}
