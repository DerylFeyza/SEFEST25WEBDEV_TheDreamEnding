import { nextGetServerSession } from '@/lib/next-auth';
import { getAllRentals } from '../utils/database/rental.query';
import { RentWithItemAndOwner } from '@/types/entities';
import RentPage from './RentPage';
import { RentalStatus } from '@prisma/client';
export default async function page({
  searchParams
}: {
  searchParams: Promise<{
    status?: string;
    search?: string;
  }>;
}) {
  const { status, search } = await searchParams;
  const session = await nextGetServerSession();
  const userRentals = await getAllRentals({
    where: {
      user_id: session!.user!.id,
      status: status?.toUpperCase() as RentalStatus,
      item: { name: { contains: search } }
    },
    include: { item: { include: { owner: true } } }
  });
  return <RentPage userRentals={userRentals as RentWithItemAndOwner[]} />;
}
