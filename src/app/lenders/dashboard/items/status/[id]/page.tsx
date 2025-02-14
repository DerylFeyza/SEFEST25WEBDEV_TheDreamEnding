import { findItemRentalCount } from '@/app/utils/database/item.query';
import { nextGetServerSession } from '@/lib/next-auth';
import ItemStatusCard from '../components/item-status-card';
import { ItemWithRentalCounts } from '@/types/entities';
import { RentalRequestCard } from '../components/rental-request-card';
import { getAllRentals } from '@/app/utils/database/rental.query';
import { RentalWithRenter } from '@/types/entities';
export default async function page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await nextGetServerSession();
  const item = await findItemRentalCount({
    id: id,
    owner_id: session!.user!.id
  });
  const rentals = await getAllRentals({
    where: { item_id: item?.id },
    include: { User: true }
  });

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <div className='col-span-4'>
        <ItemStatusCard item={item as ItemWithRentalCounts} />
      </div>
      <div className='col-span-3'>
        {rentals.map((rent) => (
          <RentalRequestCard key={rent.id} rent={rent as RentalWithRenter} />
        ))}
      </div>
    </div>
  );
}
