import { findItemRentalCount } from '@/app/utils/database/item.query';
import { nextGetServerSession } from '@/lib/next-auth';
import ItemStatusCard from '../components/item-status-card';
import { ItemWithRentalCounts } from '@/types/entities';
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

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <div className='col-span-4'>
        <ItemStatusCard item={item as ItemWithRentalCounts} />
      </div>
      <div className='col-span-3'></div>
    </div>
  );
}
