'use client';

import ItemStatusCard from '../components/item-status-card';
import { ItemWithRentalCounts } from '@/types/entities';
import { RentalRequestCard } from '../components/rental-request-card';
import { RentalWithRenter } from '@/types/entities';
import { StatusSelector } from '@/app/components/rental-request-filter';
import { useRouter } from 'next/navigation';

export default function StatusPage({
  item,
  rentals
}: {
  item: ItemWithRentalCounts;
  rentals: RentalWithRenter[];
}) {
  const router = useRouter();

  const onStatusChange = (status: string) => {
    const params = new URLSearchParams();
    if (status !== 'ALL') {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <div className='col-span-4'>
        <ItemStatusCard item={item as ItemWithRentalCounts} />
      </div>
      <div className='col-span-3'>
        <div className='container mx-auto flex flex-col space-y-4 p-4'>
          <StatusSelector onStatusChange={onStatusChange} />
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
