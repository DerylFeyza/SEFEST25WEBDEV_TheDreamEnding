import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredItems = [
  {
    id: 1,
    name: "Camping Tent",
    image: "https://picsum.photos/200/300",
    description: "4-person tent, perfect for weekend getaways",
  },
  {
    id: 2,
    name: "Mountain Bike",
    image: "https://picsum.photos/200/300",
    description: "All-terrain bike for adventurous trails",
  },
  {
    id: 3,
    name: "Kayak",
    image: "https://picsum.photos/200/300",
    description: "Single-person kayak for lake exploration",
  },
];

export function FeaturedItems() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredItems.map((item) => (
          <Card key={item.id} className="grid grid-rows-[auto_1fr_auto]">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={"https://picsum.photos/200/300"}
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <p className="text-sm text-gray-600">{item.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Rent Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
