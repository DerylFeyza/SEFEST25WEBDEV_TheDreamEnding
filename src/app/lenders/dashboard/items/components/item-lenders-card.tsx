import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit, Clock } from 'lucide-react';
import { Item } from '@prisma/client';
import { formatToIDR } from '@/helper/formatToIDR';

export default function ItemLendersCard({ item }: { item: Item }) {
  return (
    <Card className='flex flex-col overflow-hidden'>
      <div className='aspect-square relative flex justify-center'>
        <Image
          src={item.image_url}
          alt={item.name}
          width={320}
          height={320}
          className='size-80 object-cover'
        />
      </div>
      <CardContent className='grid grid-cols-2 p-4 flex-grow grid-rows-[auto_1fr_auto]'>
        <h3 className='mb-1 text-lg font-semibold'>{item.name}</h3>

        <p className='text-muted-foreground mb-2'>{item.category}</p>

        <span className='text-primary self-center font-bold'>
          {formatToIDR(item.rent_price)}
        </span>
        <span className='text-muted-foreground self-center text-sm'>
          Total Items For Rent: {item.item_amount}
        </span>

        <Button asChild className='w-full col-span-2 mt-4'>
          <Link href={`/lenders/dashboard/items/status/${item.id}`}>
            <Clock className='w-4 h-4 mr-2' />
            Rental Status
          </Link>
        </Button>

        <Button asChild className='w-full col-span-2 mt-4' variant={'outline'}>
          <Link href={`/lenders/dashboard/items/edit/${item.id}`}>
            <Edit className='w-4 h-4 mr-2' /> Edit
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
