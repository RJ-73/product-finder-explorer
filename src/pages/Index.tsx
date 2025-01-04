import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { ProductCard, type Product } from "@/components/ProductCard";
import { CompareDrawer } from "@/components/CompareDrawer";
import { useToast } from "@/components/ui/use-toast";

// Temporary mock data - replace with API call
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Wireless Earbuds",
    price: 7999,
    rating: 4.5,
    image: "https://placehold.co/300x300",
    category: "electronics",
  },
  {
    id: "2",
    title: "Smart Watch",
    price: 15999,
    rating: 4.0,
    image: "https://placehold.co/300x300",
    category: "electronics",
  },
  {
    id: "3",
    title: "Running Shoes",
    price: 5999,
    rating: 4.8,
    image: "https://placehold.co/300x300",
    category: "clothing",
  },
];

export default function Index() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [category, setCategory] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);

  const handleCompare = (product: Product) => {
    if (compareProducts.find((p) => p.id === product.id)) {
      setCompareProducts(compareProducts.filter((p) => p.id !== product.id));
    } else if (compareProducts.length < 3) {
      setCompareProducts([...compareProducts, product]);
    } else {
      toast({
        title: "Compare limit reached",
        description: "You can compare up to 3 products at a time",
      });
    }
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = category === "all" || product.category === category;
    const matchesRating = product.rating >= minRating;

    return matchesSearch && matchesPrice && matchesCategory && matchesRating;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Product Search Engine
        </h1>
        
        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Filters
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              category={category}
              onCategoryChange={setCategory}
              minRating={minRating}
              onRatingChange={setMinRating}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCompare={handleCompare}
                    isSelected={compareProducts.some((p) => p.id === product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <CompareDrawer
          products={compareProducts}
          onRemove={(product) =>
            setCompareProducts(compareProducts.filter((p) => p.id !== product.id))
          }
        />
      </div>
    </div>
  );
}