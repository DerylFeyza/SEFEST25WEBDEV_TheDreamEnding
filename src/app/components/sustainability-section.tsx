import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, Leaf, MessageCircle } from "lucide-react"

interface SustainabilitySectionProps {
  totalCarbonSavings: number;
  totalWasteReduction: number;
}

export function SustainabilitySection({ totalCarbonSavings, totalWasteReduction }: SustainabilitySectionProps) {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <CardTitle className="flex items-center text-2xl">
          <Leaf className="mr-2" />
          Your Sustainability Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center text-blue-700">
              <Leaf className="mr-2" /> Carbon Savings
            </h3>
            <p className="text-3xl font-bold text-blue-600">{totalCarbonSavings.toFixed(2)} kg</p>
            <p className="text-sm text-blue-600 mt-1">CO2 emissions avoided</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center text-green-700">
              <Recycle className="mr-2" /> Waste Reduction
            </h3>
            <p className="text-3xl font-bold text-green-600">{totalWasteReduction.toFixed(2)} kg</p>
            <p className="text-sm text-green-600 mt-1">Waste prevented</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center text-gray-700">
              <MessageCircle className="mr-2" /> Environmental Impact
            </h3>
            <p className="text-sm text-gray-600">
              Your rentals have helped reduce carbon emissions equivalent to{" "}
              <span className="font-semibold">{(totalCarbonSavings / 8).toFixed(1)} tree-months</span> of carbon
              sequestration and prevented waste equivalent to{" "}
              <span className="font-semibold">{(totalWasteReduction * 2).toFixed(1)} plastic bottles</span>.
            </p>
          </div>
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center text-gray-700">
              <MessageCircle className="mr-2" /> User Testimonial
            </h3>
            <blockquote className="italic text-sm text-gray-600 border-l-4 border-green-300 pl-4">
              &quot;GreenRent has changed the way I approach outdoor activities. I can enjoy high-quality gear without the
              guilt of unnecessary purchases.&quot;
            </blockquote>
            <p className="text-sm font-semibold mt-2 text-right text-green-600">- Bagas S. W.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
