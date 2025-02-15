import { allItems } from '@/types/entities';
import RentalsPage from './RentalsPage';
import { getAllItems } from '@/app/utils/actions/item';

export default async function Page() {
  const items = (await getAllItems()) as allItems[];

  return <RentalsPage initialItems={items} />;
}
