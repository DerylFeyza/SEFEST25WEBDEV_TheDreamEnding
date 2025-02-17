import { Dashboard } from "./components/dashboard"
import { getAllItems } from "@/app/utils/actions/item"
import { getAllRentals } from "./utils/database/rental.query"
import type { Rental, SustainabilityImpact } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-auth"
import { redirect } from "next/navigation"

type ExtendedRental = Rental & {
  item: { name: string }
  sustainabilityImpact: SustainabilityImpact
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    redirect('/auth/login');
  }  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
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
