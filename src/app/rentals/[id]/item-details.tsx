import { Badge } from '@/components/ui/badge';
import type { Item } from '@prisma/client';
import { Leaf, CloudOff, Recycle } from 'lucide-react';

export function ItemDetails({ item }: { item: Item }) {
  return (
    <div>
      <h1 className='mb-2 text-3xl font-semibold'>{item.name}</h1>
      <div className='flex items-center gap-2 mb-4'>
        <Badge variant='secondary'>{item.category}</Badge>
        <Badge variant='outline'>{item.condition}</Badge>
      </div>
      <div className='mb-4'>
        <p className='text-2xl font-bold text-green-600'>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
          }).format(item.rent_price)}
          <span className='text-sm font-normal text-gray-600'> / day</span>
        </p>
      </div>
      <div className='space-y-2 text-gray-600 mb-4'>
        <p>
          <span className='font-semibold'>Condition:</span> {item.condition}
        </p>
        <p>
          <span className='font-semibold'>Description:</span> {item.description}
        </p>
      </div>
      <div className='space-y-2 mb-4'>
        <div className='flex items-center text-green-600'>
          <Leaf className='w-5 h-5 mr-2' />
          <span className='font-semibold'>Eco-friendly rental</span>
        </div>
        <div className='flex items-center text-blue-600'>
          <CloudOff className='w-5 h-5 mr-2' />
          <span>
            <span className='font-semibold'>
              {item.dailyCarbonSaving.toFixed(2)} kg
            </span>{' '}
            CO2 saved per day
          </span>
        </div>
        <div className='flex items-center text-orange-600'>
          <Recycle className='w-5 h-5 mr-2' />
          <span>
            <span className='font-semibold'>
              {item.dailyWasteReduction.toFixed(2)} kg
            </span>{' '}
            waste reduced per day
          </span>
        </div>
      </div>
    </div>
  );
}
