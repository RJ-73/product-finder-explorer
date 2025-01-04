import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { type Product } from "./ProductCard";
import { Star } from "lucide-react";

interface CompareDrawerProps {
  products: Product[];
  onRemove: (product: Product) => void;
}

export function CompareDrawer({ products, onRemove }: CompareDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 z-50"
          disabled={products.length === 0}
        >
          Compare ({products.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Compare Products</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-grow">
                <h3 className="font-medium mb-1">{product.title}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
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
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => onRemove(product)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-center text-gray-500">
              Select products to compare them
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}