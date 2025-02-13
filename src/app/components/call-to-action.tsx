import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="bg-green-100 p-8 rounded-lg text-center mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Join the Sustainable Rental Movement
      </h2>
      <p className="mb-6">
        Reduce waste and save money by renting instead of buying.
      </p>
      <div className="flex justify-center space-x-4">
        <Button size="lg">Rent Now</Button>
        <Button size="lg" variant="outline">
          List Your Item
        </Button>
      </div>
    </section>
  );
}
