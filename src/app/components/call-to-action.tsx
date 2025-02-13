import { Button } from "@heroui/react";

export default function CallToAction() {
  return (
    <section className="my-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        Join Our Sustainable Community
      </h2>
      <p className="mb-4">
        Start renting, reduce waste, and make a positive impact on the
        environment.
      </p>
      <div className="flex justify-center space-x-4">
        <Button color="primary" size="lg">
          Rent Now
        </Button>
        <Button color="secondary" size="lg">
          List Your Item
        </Button>
      </div>
    </section>
  );
}
