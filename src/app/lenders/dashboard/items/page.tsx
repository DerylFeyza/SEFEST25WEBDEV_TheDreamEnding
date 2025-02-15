import { findAllItems } from '@/app/utils/database/item.query';
import { nextGetServerSession } from '@/lib/next-auth';
import ItemsPage from './ItemsPage';
export default async function page({
  searchParams
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  const session = await nextGetServerSession();
  const items = await findAllItems({
    search: { name: search, description: search },
    where: { is_deleted: false, owner_id: session!.user!.id }
  });

  return (
    <div>
      <ItemsPage items={items} search={search} />
    </div>
  );
}
