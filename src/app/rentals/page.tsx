import { allItems } from '@/types/entities';
import RentalsPage from './RentalsPage';
import { getAllItems } from '@/app/utils/actions/item';

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  const items = (await getAllItems({
    where: { name: { contains: search, mode: 'insensitive' } }
  })) as allItems[];

  return <RentalsPage initialItems={items} searchData={search} />;
}
