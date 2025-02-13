import { Badge } from "@/components/ui/badge";

interface ItemDetailsProps {
  item: {
    name: string;
    price: number;
    discount?: number;
    condition: string;
    minimumRental: string;
    category: string;
  };
}

export function ItemDetails({ item }: ItemDetailsProps) {
  const discountedPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-semibold">{item.name}</h1>
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary">{item.category}</Badge>
        <Badge variant="outline">{item.condition}</Badge>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold text-green-600">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(discountedPrice)}
          {item.discount && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(item.price)}
            </span>
          )}
        </p>
        {item.discount && (
          <p className="text-sm text-red-500">Save {item.discount}%</p>
        )}
      </div>
      <div className="space-y-2 text-gray-600">
        <p>Condition: {item.condition}</p>
        <p>Minimum Rental: {item.minimumRental}</p>
      </div>
    </div>
  );
}
