'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ItemCard } from '@/components/ItemCard';
import { allItems } from '@/types/entities';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface RentalsPageProps {
  initialItems: allItems[];
  searchData?: string;
}

export default function RentalsPage({
  initialItems,
  searchData
}: RentalsPageProps) {
  const params = new URLSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchData ?? '');
  console.log('items', initialItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    params.set('search', e.target.value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='from-green-50 to-green-100 min-h-screen py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-8 text-green-800 text-center'>
          Eco-Friendly Rentals
        </h1>
        <div className='mb-8 relative'>
          <Input
            type='search'
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Search rentals'
            className='focus:outline-none focus:border-green-700 w-full py-2 pl-10 pr-4 border-2 border-green-500 rounded-full'
          />
          <Search className='left-3 top-1/2 absolute text-gray-400 transform -translate-y-1/2' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {initialItems.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
