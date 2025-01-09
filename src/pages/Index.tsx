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
    price: 799,
    rating: 4.5,
    image: "https://img.freepik.com/free-photo/still-life-wireless-cyberpunk-headphones_23-2151072198.jpg?semt=ais_hybrid",
    category: "electronics",
  },
  {
    id: "2",
    title: "Smart Watch",
    price: 859,
    rating: 4.0,
    image: "https://image.made-in-china.com/2f0j00ZlGinybzSAUN/Smart-Mobile-Phone-Watch-HD-Screen-APP-Download-Heart-Rate-Blood-Pressure-and-Other-Multi-Functional-Sports-Health-Smart-Watch.webp",
    category: "electronics",
  },
  {
    id: "3",
    title: "Running Shoes",
    price: 999,
    rating: 4.8,
    image: "https://media.istockphoto.com/id/1350560575/photo/pair-of-blue-running-sneakers-on-white-background-isolated.jpg?s=612x612&w=0&k=20&c=A3w_a9q3Gz-tWkQL6K00xu7UHdN5LLZefzPDp-wNkSU=",
    category: "clothing",
  },{
    id: "4",
    title: "Wired EarPhones",
    price: 499,
    rating: 3.8,
    image: "https://blaupunktaudio.in/cdn/shop/products/em-01-wired-earphone-black-blaupunkt-india-1.png?v=1710484318",
    category: "electronics",
  },{
    id: "5",
    title: "Fastrack Watch",
    price: 599,
    rating: 2.8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBtWmxv9PgNI_v-k2eheUDQnZyDW8OY-rtQQ&s",
    category: "electronics",
  },
  {
    id: "6",
    title: "Formal Shoes",
    price: 5999,
    rating: 4.8,
    image: "https://cdn.pixabay.com/photo/2019/01/31/08/51/shoes-3966245_1280.jpg",
    category: "clothing",
  },
  {
    id: "7",
    title: "DVT TextBook",
    price: 15999,
    rating: 5.0,
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/regionalbooks/1/v/z/dams-dvt-workbook-neetpg-ka-first-aid-2023-2024-spiral-binding-original-imagw6444k8qmx3k.jpeg?q=90&crop=false",
    category: "books",
  },
  {
    id: "8",
    title: "AIML",
    price: 999,
    rating: 3.7,
    image: "https://learnengineering.in/wp-content/uploads/2023/04/CS3491-Artificial-Intelligence-and-Machine-Learning.jpg",
    category: "books",
  },  {
    id: "10",
    title: "Smartphone",
    price: 25999,
    rating: 4.6,
    image: "https://example.com/images/smartphone.jpg",
    category: "electronics",
  },
  {
    id: "11",
    title: "Laptop Backpack",
    price: 1999,
    rating: 4.5,
    image: "https://example.com/images/laptop-backpack.jpg",
    category: "electronics",
  },
  {
    id: "12",
    title: "Wireless Keyboard",
    price: 1499,
    rating: 4.3,
    image: "https://example.com/images/wireless-keyboard.jpg",
    category: "electronics",
  },
  {
    id: "13",
    title: "Men's T-Shirt",
    price: 499,
    rating: 4.4,
    image: "https://example.com/images/mens-tshirt.jpg",
    category: "clothing",
  },
  {
    id: "14",
    title: "Women's Summer Dress",
    price: 1299,
    rating: 4.5,
    image: "https://example.com/images/womens-summer-dress.jpg",
    category: "clothing",
  },
  {
    id: "15",
    title: "Men's Jacket",
    price: 2499,
    rating: 4.7,
    image: "https://example.com/images/mens-jacket.jpg",
    category: "clothing",
  },
  {
    id: "16",
    title: "Inspirational Book",
    price: 399,
    rating: 4.8,
    image: "https://example.com/images/inspirational-book.jpg",
    category: "books",
  },
  {
    id: "17",
    title: "Science Fiction Novel",
    price: 599,
    rating: 4.6,
    image: "https://example.com/images/science-fiction-novel.jpg",
    category: "books",
  },
  {
    id: "18",
    title: "Children's Storybook",
    price: 299,
    rating: 4.7,
    image: "https://example.com/images/childrens-storybook.jpg",
    category: "books",
  },
  {
    id: "19",
    title: "Bluetooth Headphones",
    price: 3499,
    rating: 4.6,
    image: "https://example.com/images/bluetooth-headphones.jpg",
    category: "electronics",
  },
  {
    id: "20",
    title: "Men's Formal Shirt",
    price: 899,
    rating: 4.5,
    image: "https://example.com/images/mens-formal-shirt.jpg",
    category: "clothing",
  },
  {
    id: "21",
    title: "Fantasy Adventure Book",
    price: 699,
    rating: 4.9,
    image: "https://example.com/images/fantasy-adventure-book.jpg",
    category: "books",
  }
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 " id="bg">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-black ">
          
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