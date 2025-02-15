'use client';
import { RentCard } from './components/rent-card';
import { RentWithItemAndOwner } from '@/types/entities';
import { useRouter } from 'next/navigation';
import SearchInput from '../components/search-input';
import { StatusSelector } from '../components/rental-request-filter';
import { useState } from 'react';
export default function RentPage({
  userRentals,
  search
}: {
  userRentals: RentWithItemAndOwner[];
  search?: {
    search: string;
    status: string;
  };
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search?.search ?? '');
  const [statusTerm, setStatusTerm] = useState(search?.status ?? '');
  const params = new URLSearchParams();

  const onStatusChange = (status: string) => {
    setStatusTerm(status);
    if (searchTerm) {
      params.set('search', searchTerm);
    }

    if (status !== 'ALL') {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (statusTerm !== 'ALL') {
      params.set('status', statusTerm);
    }

    if (newSearchTerm) {
      params.set('search', newSearchTerm);
    } else {
      params.delete('search');
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='xl:mx-8'>
      <div className='justify-between space-x-4 flex w-full flex-wrap'>
        <div className='flex-grow'>
          <SearchInput
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className='flex'>
          <StatusSelector onStatusChange={onStatusChange} />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-9 bg-red '>
        {userRentals.map((rent) => (
          <div className='col-span-3' key={rent.id}>
            <RentCard rent={rent as RentWithItemAndOwner} />
          </div>
        ))}
      </div>
    </div>
  );
}
