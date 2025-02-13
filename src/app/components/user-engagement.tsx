import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";

export default function UserEngagement() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        Community Spotlight
      </h2>
      <Card>
        <CardBody>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar src="/placeholder.svg?height=40&width=40" size="lg" />
            <div>
              <h3 className="text-lg font-semibold">
                Sarah&apos;s Camping Adventure
              </h3>
              <p className="text-small text-default-500">
                Rented gear for a family trip
              </p>
            </div>
          </div>
          <p className="mb-4">
            &quot;Renting camping gear for our family trip was a game-changer!
            We saved money, reduced clutter at home, and had access to
            high-quality equipment. Plus, knowing we were minimizing our
            environmental impact made the experience even better.&quot;
          </p>
          <Button color="success" variant="flat">
            Share Your Story
          </Button>
        </CardBody>
      </Card>
    </section>
  );
}
