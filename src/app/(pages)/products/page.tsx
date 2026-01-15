import { ProductI } from "@/interfaces/product";
import ProductCard from "@/components/ui/ProductCard";

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    { cache: "no-store" }
  );

  const json = await response.json();
  const products: ProductI[] = json.data;

  return (
    <main>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-7">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
