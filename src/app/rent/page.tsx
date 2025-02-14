import { nextGetServerSession } from '@/lib/next-auth';
import { getAllRentals } from '../utils/database/rental.query';
import { RentWithItemAndOwner } from '@/types/entities';
import RentPage from './RentPage';
export default async function page() {
  const session = await nextGetServerSession();

  const userRentals = await getAllRentals({
    where: { user_id: session!.user!.id },
    include: { item: { include: { owner: true } } }
  });
  return <RentPage userRentals={userRentals as RentWithItemAndOwner[]} />;
}
