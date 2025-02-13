import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

const featuredItems = [
  {
    id: 1,
    name: "Camping Tent",
    image: "/placeholder.svg?height=200&width=200",
    description: "4-person tent, perfect for weekend getaways",
  },
  {
    id: 2,
    name: "Mountain Bike",
    image: "/placeholder.svg?height=200&width=200",
    description: "All-terrain bike for adventurous trails",
  },
  {
    id: 3,
    name: "Kayak",
    image: "/placeholder.svg?height=200&width=200",
    description: "Single-person kayak for lake exploration",
  },
];

export default function FeaturedItems() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Featured Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredItems.map((item) => (
          <Card key={item.id}>
            <CardBody className="p-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={300}
                height={200}
                className="object-cover w-full h-[200px]"
              />
            </CardBody>
            <CardFooter className="flex-col items-start gap-2">
              <h4 className="font-bold text-large">{item.name}</h4>
              <p className="text-small text-default-500">{item.description}</p>
              <Button color="primary" className="mt-2">
                Rent Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
