import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  minRating: number;
  onRatingChange: (value: number) => void;
}

export function Filters({
  priceRange,
  onPriceChange,
  category,
  onCategoryChange,
  minRating,
  onRatingChange,
}: FiltersProps) {
  // Format price in Indian number system
  const formatIndianPrice = (price: number) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR'
    });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          max={1000}
          step={10}
          onValueChange={(value) => onPriceChange(value as [number, number])}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{formatIndianPrice(priceRange[0])}</span>
          <span>{formatIndianPrice(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Category</h3>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="books">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
        <Select
          value={minRating.toString()}
          onValueChange={(value) => onRatingChange(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select minimum rating" />
          </SelectTrigger>
          <SelectContent>
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <SelectItem key={rating} value={rating.toString()}>
                {rating === 0 ? "Any" : `${rating}+ Stars`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}