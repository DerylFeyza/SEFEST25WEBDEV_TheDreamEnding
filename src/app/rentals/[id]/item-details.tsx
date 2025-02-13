import { Badge } from "@/components/ui/badge";
import { Item } from "@prisma/client";

export function ItemDetails({ item }: { item: Item }) {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-semibold">{item.name}</h1>
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary">
          {item.id} TODO: This Should Be A Category
        </Badge>
        <Badge variant="outline">{item.condition}</Badge>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold text-green-600">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(item.rent_price)}
        </p>
      </div>
      <div className="space-y-2 text-gray-600">
        <p>Condition: {item.condition}</p>
      </div>
    </div>
  );
}
