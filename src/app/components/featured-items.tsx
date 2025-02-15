import { ItemCard } from '@/components/ItemCard';
import { allItems } from '@/types/entities';

interface FeaturedItemsProps {
  items: allItems[];
}

export function FeaturedItems({ items }: FeaturedItemsProps) {
  const featuredItems = items.slice(0, 3);

  return (
    <section className='my-4'>
      <h2 className='text-2xl font-bold mb-4 text-green-800'>Featured Items</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {featuredItems.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
