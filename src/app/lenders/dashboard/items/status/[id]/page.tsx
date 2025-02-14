import { findItemRentalCount } from '@/app/utils/database/item.query';
import { nextGetServerSession } from '@/lib/next-auth';
import { ItemWithRentalCounts } from '@/types/entities';
import { getAllRentals } from '@/app/utils/database/rental.query';
import { RentalWithRenter } from '@/types/entities';
import { RentalStatus } from '@prisma/client';
import StatusPage from './StatusPage';

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
  const session = await nextGetServerSession();
  const item = await findItemRentalCount({
    id: id,
    owner_id: session!.user!.id
  });
  const rentals = await getAllRentals({
    where: { item_id: item?.id, status: status?.toUpperCase() as RentalStatus },
    include: { User: true }
  });

  return (
    <StatusPage
      item={item as ItemWithRentalCounts}
      rentals={rentals as RentalWithRenter[]}
    />
  );
}
