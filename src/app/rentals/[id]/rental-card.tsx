import type React from 'react';
import { MessageSquare, Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Item, Review } from '@prisma/client';
import { handleCreateRental } from '@/app/utils/actions/rental';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';

export interface RentalCardProps {
  item: Item & { reviews?: Review[] };
  items: number;
  setItems: React.Dispatch<React.SetStateAction<number>>;
  user?: string;
}

export function RentalCard({ item, items, setItems }: RentalCardProps) {
  const [layoutHeaderHeight, setLayoutHeaderHeight] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [paidAmount, setPaidAmount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const layoutHeader = document.getElementById('layout-header');
    if (layoutHeader) {
      const height = layoutHeader.clientHeight + 32;
      setLayoutHeaderHeight(height);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.forEach((value, key) => console.log(key, ',', value)));

    if (!session?.user?.id) {
      setMessage({ success: false, message: 'Please log in to rent items' });
      return;
    }

    formData.set('user_id', session.user.id);
    formData.set('item_id', item.id);

    const result = (await handleCreateRental(formData)) as {
      success: boolean;
      message: string;
    };
    setMessage(result);

    if (result.success) {
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <Card className={cn(' sticky')} style={{ top: layoutHeaderHeight }}>
      <CardHeader>
        <CardTitle>Rent This Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input type='hidden' name='item_id' value={item.id} />

          <div className='space-y-2'>
            <div>
              <label className='block mb-1 text-sm font-medium'>
                Start Date
              </label>
              <input
                type='date'
                name='startDate'
                required
                min={new Date().toISOString().split('T')[0]}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='w-full p-2 border rounded-md'
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium'>End Date</label>
              <input
                type='date'
                name='endDate'
                required
                min={startDate || new Date().toISOString().split('T')[0]}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='w-full p-2 border rounded-md'
              />
            </div>
          </div>

          <div className='flex items-center justify-between mb-4'>
            <Button
              onClick={() => setItems(Math.max(1, items - 1))}
              variant='ghost'
              className='text-xl'
              disabled={item.available ? false : true || items <= 1}
            >
              -
            </Button>
            <span className='px-4'>{items}</span>
            <Button
              onClick={() => setItems(Math.min(item.item_amount, items + 1))}
              disabled={
                item.available ? false : true || items >= item.item_amount
              }
              variant='ghost'
              className='text-xl'
            >
              +
            </Button>
          </div>
          <div>
            <p className='text-sm text-gray-600'>
              Available: {item.available ? 'Yes' : 'No'}
            </p>
            <p className='text-sm text-gray-600'>Stock: {item.item_amount}</p>
          </div>
          <p className='mb-4 text-lg font-bold'>
            Total:{' '}
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(items * item.rent_price)}
          </p>
          <div className='space-y-2'>
            <Button
              disabled={item.available ? false : true}
              className=' w-full bg-green-600'
            >
              {item.available ? 'Rent Now' : 'This Item Is Not Available'}
            </Button>
            {/* <Button
            disabled={item.available ? false : true}
            className="w-full"
            variant="outline"
          >
            Add To Cart
          </Button> */}
            {/* TODO: Fix this temporary solution */}
            <Input
              type='number'
              value={paidAmount}
              name='paid_amount'
              onChange={(e) => setPaidAmount(parseInt(e.target.value))}
              placeholder={`Enter a minimum of ${item.rent_price}`}
            />
          </div>
          {message && (
            <p
              className={`text-sm ${
                message.success ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message.message}
            </p>
          )}
        </form>
      </CardContent>
      <CardFooter className='justify-between'>
        <Button variant='ghost' size='sm'>
          <MessageSquare className='w-4 h-4 mr-2' /> Chat
        </Button>
        <Button variant='ghost' size='sm'>
          <Heart className='w-4 h-4 mr-2' /> Wishlist
        </Button>
        <Button variant='ghost' size='sm'>
          <Share className='w-4 h-4 mr-2' /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
