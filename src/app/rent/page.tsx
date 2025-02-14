import { nextGetServerSession } from '@/lib/next-auth';
import { getAllRentals } from '../utils/database/rental.query';
import { RentCard } from './components/rent-card';
import { RentWithItemAndOwner } from '@/types/entities';
export default async function page() {
  const session = await nextGetServerSession();

  const userRentals = await getAllRentals({
    where: { user_id: session!.user!.id },
    include: { item: { include: { owner: true } } }
  });
  console.log(userRentals);
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6  xl:grid-cols-9 bg-red xl:mx-8 '>
      {userRentals.map((rent) => (
        <div className='col-span-3' key={rent.id}>
          <RentCard rent={rent as RentWithItemAndOwner} />
        </div>
      ))}
    </div>
  );
}
