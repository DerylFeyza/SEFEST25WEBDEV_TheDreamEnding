import { Dashboard } from './components/dashboard';
import { getAllItems } from '@/app/utils/actions/item';
import { getAllRentals } from './utils/database/rental.query';
import { Rental } from '@prisma/client';
type ExtendedRental = Rental & { item: { name: string } };

export default async function Home() {
  const items = await getAllItems();
  const rentalHistory = (await getAllRentals({
    take: 5,
    include: { item: { select: { name: true } } }
  })) as ExtendedRental[];
  return <Dashboard rentalHistory={rentalHistory} items={items} />;
}
