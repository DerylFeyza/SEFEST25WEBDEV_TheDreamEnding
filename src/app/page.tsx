import { Dashboard } from "./components/dashboard"
import { getAllItems } from "@/app/utils/actions/item"
import { getAllRentals } from "./utils/database/rental.query"
import type { Rental, SustainabilityImpact } from "@prisma/client"

type ExtendedRental = Rental & {
  item: { name: string }
  sustainabilityImpact: SustainabilityImpact
}

export default async function Home() {
  const items = await getAllItems()
  const rentalHistory = (await getAllRentals({
    take: 5,
    include: {
      item: { select: { name: true } },
      sustainabilityImpact: true,
    },
  })) as ExtendedRental[]

  return <Dashboard rentalHistory={rentalHistory} items={items} />
}
