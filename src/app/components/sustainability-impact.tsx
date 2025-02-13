import { Card, CardBody } from "@heroui/card";
import { Progress } from "@heroui/progress";

export default function SustainabilityImpact() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        Sustainability Impact
      </h2>
      <Card>
        <CardBody>
          <h3 className="text-xl font-semibold mb-2">Your Rental Impact</h3>
          <p className="mb-4">
            By renting instead of buying, you&apos;ve helped reduce waste and
            conserve resources:
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>CO2 Emissions Saved</span>
                <span>75%</span>
              </div>
              <Progress color="success" value={75} />
            </div>
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span>Water Usage Reduced</span>
                <span>60%</span>
              </div>
              <Progress color="primary" value={60} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Landfill Waste Avoided</span>
                <span>90%</span>
              </div>
              <Progress color="warning" value={90} />
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
