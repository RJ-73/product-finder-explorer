import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onCompare: (product: Product) => void;
  isSelected: boolean;
}

export function ProductCard({ product, onCompare, isSelected }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="pt-4 flex-grow">
        <div className="aspect-square relative mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>
        <p className="text-lg font-bold">₹{product.price.toLocaleString('en-IN')}</p>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant={isSelected ? "secondary" : "outline"}
          className="w-full"
          onClick={() => onCompare(product)}
        >
          {isSelected ? "Remove from Compare" : "Compare"}
        </Button>
      </CardFooter>
    </Card>
  );
}