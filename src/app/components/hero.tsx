import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Leaf, Recycle, TreePine, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 py-16 sm:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png?height=800&width=1600"
          alt="Nature background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-green-600">Eco-Friendly</span>
              <span className="block">Outdoor Rentals</span>
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Enjoy the outdoors responsibly. Rent high-quality gear for your adventures while reducing your
              environmental impact.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/rent">
                    Start Renting
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <Leaf className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Eco-Conscious</h3>
              <p className="mt-2 text-sm text-gray-500">Reduce waste by renting instead of buying</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <Recycle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Sustainable</h3>
              <p className="mt-2 text-sm text-gray-500">Support a circular economy model</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <TreePine className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Nature-Friendly</h3>
              <p className="mt-2 text-sm text-gray-500">Minimize your impact on the environment</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
             <ShieldCheck className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Quality Gear</h3>
              <p className="mt-2 text-sm text-gray-500">Access to top-notch outdoor equipment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}