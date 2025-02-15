'use client';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { handleUpdateRental } from '@/app/utils/actions/rental';
import { toast } from 'sonner';
import { RentalStatus } from '@prisma/client';
import { getDaysDifference } from '@/helper/days-diff';
import { RentWithItemAndOwner } from '@/types/entities';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { BaggageClaim, CalendarDays, Clock, HandCoins } from 'lucide-react';
import Link from 'next/link';
import { formatToIDR } from '@/helper/formatToIDR';

export function RentCard({ rent }: { rent: RentWithItemAndOwner }) {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusColors: any = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const handleUpdate = async (status: RentalStatus) => {
    setLoading(true);
    const loadingToast = toast.loading('Updating Request...');
    const formData = new FormData();
    formData.append('status', status);
    const result = await handleUpdateRental(rent.id, formData);
    if (result.success) {
      setLoading(false);
      return toast.success('Rent request updated successfully', {
        id: loadingToast
      });
    }
    setLoading(false);
    return toast.success('Rent request update failed!', {
      id: loadingToast
    });
  };

  const rentDays = getDaysDifference(rent.start_date, rent.finished_date);

  return (
    <div className='container mx-auto flex flex-col space-y-4'>
      <Card className='w-full'>
        <CardHeader className='w-full'>
          <div className='w-full flex justify-between'>
            <CardTitle>{rent.item.name}</CardTitle>
            <Badge
              className={`${statusColors[rent.status.toLowerCase()]} capitalize`}
            >
              {rent.status.toLowerCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='space-y-3 grid grid-cols-1 md:grid-cols-6 md:space-x-8'>
          <div className='relative col-span-2 aspect-square flex justify-center'>
            <Link href={`/rentals/${rent.item.id}`}>
              <Image
                src={rent.item.image_url}
                alt={rent.item.name}
                width={500}
                height={500}
                className='object-cover h-full w-full rounded-lg hover:scale-110 transition'
              />
            </Link>
          </div>
          <div className='col-span-4 flex flex-col justify-between space-y-1 md:!my-0 !ml-4'>
            <div className='grid grid-cols-[auto_1fr] '>
              <div className='items-center gap-2 flex flex-row'>
                <Clock className='h-4 w-4 text-muted-foreground' />
                <span>Rent Duration: </span>
              </div>
              <span className='text-end'>{rentDays} Days</span>
            </div>
            <div className='grid grid-cols-[auto_1fr]'>
              <div className='items-center gap-2 flex flex-row'>
                <CalendarDays className='h-4 w-4 text-muted-foreground' />
                <span>Start Date: </span>
              </div>
              <span className='text-end'>
                {format(new Date(rent.start_date), 'dd-MM-yyyy')}
              </span>
            </div>
            <div className='grid grid-cols-[auto_1fr]'>
              <div className='items-center gap-2 flex flex-row'>
                <CalendarDays className='h-4 w-4 text-muted-foreground' />
                <span>End Date: </span>
              </div>
              <span className='text-end'>
                {format(new Date(rent.finished_date), 'dd-MM-yyyy')}
              </span>
            </div>
            <div className='grid grid-cols-[auto_1fr]'>
              <div className='items-center space-x-2 flex flex-row'>
                <BaggageClaim className='h-4 w-4 text-muted-foreground' />
                <span>Item Rented: </span>
              </div>
              <span className='text-end'>{rent.rent_amount}</span>
            </div>
            <div className='grid grid-cols-[auto_1fr]'>
              <div className='items-center space-x-2 flex flex-row'>
                <HandCoins className='h-4 w-4 text-muted-foreground' />
                <span>Daily Rent Price: </span>
              </div>
              <span className='text-end'>
                {formatToIDR(Math.ceil(rent.paid_amount / rentDays))}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex justify-between space-x-4 min-h-[80px]'>
          <div className='space-x-4'>
            {rent.status === RentalStatus.PENDING ? (
              <CardDescription className='max-w-xs'>
                Wait for lender confirmation.
              </CardDescription>
            ) : rent.status === RentalStatus.CONFIRMED ? (
              <div className='flex flex-row space-x-2'>
                <Button
                  disabled={loading}
                  onClick={() => handleUpdate('CANCELLED')}
                  variant='outline'
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => handleUpdate('ONGOING')}
                >
                  Start Rent
                </Button>
              </div>
            ) : rent.status === RentalStatus.COMPLETED ? (
              <CardDescription className='max-w-xs'>
                Finished rent order
              </CardDescription>
            ) : rent.status === RentalStatus.CANCELLED ? (
              <CardDescription className='max-w-xs'>
                You or renter has cancelled this order
              </CardDescription>
            ) : rent.status === RentalStatus.ONGOING ? (
              <Button
                disabled={loading}
                onClick={() => handleUpdate('COMPLETED')}
              >
                Finish Rent
              </Button>
            ) : null}
          </div>
          <CardTitle>Total: {formatToIDR(rent.paid_amount)}</CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
}
