'use client';
import { Input } from '@/components/ui/input';
export default function SearchInput({
  searchTerm,
  onSearchChange
}: {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className='flex items-center mb-6 space-x-2'>
      <Input
        placeholder='Search...'
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
}
