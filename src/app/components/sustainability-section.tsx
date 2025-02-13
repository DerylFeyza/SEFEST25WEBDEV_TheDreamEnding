import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SustainabilitySection() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Sustainability Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Waste Reduction</h3>
            <Progress value={75} className="w-full" />
            <p className="text-sm text-gray-600 mt-1">
              75% less waste compared to buying new
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Carbon Footprint</h3>
            <Progress value={60} className="w-full" />
            <p className="text-sm text-gray-600 mt-1">
              60% reduction in carbon emissions
            </p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">User Testimonial</h3>
            <blockquote className="italic text-sm text-gray-600">
              &quot;EcoRent has changed the way I approach outdoor activities. I
              can enjoy high-quality gear without the guilt of unnecessary
              purchases.&quot;
            </blockquote>
            <p className="text-sm font-semibold mt-2">- Sarah M., Avid Hiker</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
