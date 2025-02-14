'use client';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { handleUpdateRental } from '@/app/utils/actions/rental';
import { toast } from 'sonner';
import { CalendarDays, Clock, HandCoins, BaggageClaim } from 'lucide-react';
import { RentalStatus } from '@prisma/client';
import { RentalWithRenter } from '@/types/entities';
import { getDaysDifference } from '@/helper/days-diff';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function RentalRequestCard({ rent }: { rent: RentalWithRenter }) {
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
    <div className='container mx-auto flex flex-col space-y-4 p-4'>
      <Card className='w-full'>
        <CardHeader className='w-full'>
          <div className='w-full flex justify-between'>
            <CardTitle>{rent.User.name}</CardTitle>

            <Badge
              className={`${statusColors[rent.status.toLowerCase()]} capitalize`}
            >
              {rent.status.toLowerCase()}
            </Badge>
          </div>
          <CardDescription>{rent.User.email}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex justify-between'>
            <div className='items-center space-x-2 flex flex-row'>
              <Clock className='h-4 w-4 text-muted-foreground' />
              <span>Rent Duration: </span>
            </div>
            <span>{rentDays} Days</span>
          </div>

          <div className='flex justify-between'>
            <div className='items-center space-x-2 flex flex-row'>
              <CalendarDays className='h-4 w-4 text-muted-foreground' />
              <span>Rent Date: </span>
            </div>
            <span>
              <span>
                {format(new Date(rent.start_date), 'dd-MM-yyyy')} -{' '}
                {format(new Date(rent.finished_date), 'dd-MM-yyyy')}
              </span>
            </span>
          </div>
          <div className='flex justify-between'>
            <div className='items-center space-x-2 flex flex-row'>
              <BaggageClaim className='h-4 w-4 text-muted-foreground' />
              <span>Rent Amount: </span>
            </div>
            <span>{rent.rent_amount}</span>
          </div>
          <div className='flex justify-between'>
            <div className='items-center space-x-2 flex flex-row'>
              <HandCoins className='h-4 w-4 text-muted-foreground' />
              <span>Daily Revenue: </span>
            </div>
            <span>Rp. {rent.paid_amount / rentDays}</span>
          </div>
        </CardContent>

        <CardFooter className='flex justify-between'>
          <div className='space-x-4'>
            {rent.status === RentalStatus.PENDING ? (
              <>
                <Button
                  disabled={loading}
                  onClick={() => handleUpdate('CANCELLED')}
                  variant='outline'
                >
                  Reject
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => handleUpdate('CONFIRMED')}
                >
                  Confirm
                </Button>
              </>
            ) : rent.status === RentalStatus.CONFIRMED ? (
              <CardDescription className='max-w-xs'>
                Wait for the renter to pick up their rented items and update the
                status to ongoing.
              </CardDescription>
            ) : rent.status === RentalStatus.COMPLETED ? (
              <CardDescription className='max-w-xs'>
                Finished rent order
              </CardDescription>
            ) : rent.status === RentalStatus.CANCELLED ? (
              <CardDescription className='max-w-xs'>
                You or renter has cancelled this order
              </CardDescription>
            ) : rent.status === RentalStatus.ONGOING ? (
              <CardDescription className='max-w-xs'>
                This item is currently in use by the renter
              </CardDescription>
            ) : null}
          </div>
          <CardTitle>Total: Rp.{rent.paid_amount}</CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
}
