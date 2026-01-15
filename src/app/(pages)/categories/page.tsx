import { CategoryI } from "@/interfaces/categories";
import ItemCard from "@/components/ui/itemCard";
// import { Item } from '@/types/item';

export default async function CategoriesPage() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const json = await res.json();
  const categories: CategoryI[] = json.data;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <ItemCard
            key={cat._id}
            path={`/categories/${cat._id}`}
            name={cat.name}
            image={cat.image}
          />
        ))}
      </div>
    </div>
  );
}
