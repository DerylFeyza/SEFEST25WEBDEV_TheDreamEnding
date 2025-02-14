import { findItemRentalCount } from '@/app/utils/database/item.query';
import { nextGetServerSession } from '@/lib/next-auth';
import ItemStatusCard from '../components/item-status-card';
import { ItemWithRentalCounts } from '@/types/entities';
import { RentalRequestCard } from '../components/rental-request-card';
import { getAllRentals } from '@/app/utils/database/rental.query';
import { RentalWithRenter } from '@/types/entities';
import { RentalStatus } from '@prisma/client';
import { StatusSelector } from '../components/rental-request-filter';
export default async function page({
  params,
  searchParams
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    status?: string;
  }>;
}) {
  const { id } = await params;
  const { status } = await searchParams;
  console.log(status);
  const session = await nextGetServerSession();
  const item = await findItemRentalCount({
    id: id,
    owner_id: session!.user!.id
  });
  const rentals = await getAllRentals({
    where: { item_id: item?.id, status: status?.toUpperCase() as RentalStatus },
    include: { User: true }
  });

  console.log(rentals);

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <div className='col-span-4'>
        <ItemStatusCard item={item as ItemWithRentalCounts} />
      </div>
      <div className='col-span-3'>
        <div className='container mx-auto flex flex-col space-y-4 p-4'>
          <StatusSelector />
        </div>
        <div className='lg:max-h-[1825px] xl:max-h-[925px] overflow-y-auto'>
          {rentals.map((rent) => (
            <RentalRequestCard key={rent.id} rent={rent as RentalWithRenter} />
          ))}
        </div>
      </div>
    </div>
  );
}
