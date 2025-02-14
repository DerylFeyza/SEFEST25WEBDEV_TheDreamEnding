'use client';
import { Button } from '@/components/ui/button';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusColors: any = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800'
  };

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
            <span>
              {getDaysDifference(rent.start_date, rent.finished_date)} Days
            </span>
          </div>

          <div className='flex justify-between'>
            <div className='items-center space-x-2 flex flex-row'>
              <CalendarDays className='h-4 w-4 text-muted-foreground' />
              <span>Rent Date: </span>
            </div>
            <span>
              {rent.start_date.toLocaleDateString()} -{' '}
              {rent.finished_date.toLocaleDateString()}
            </span>
          </div>
          <div className='flex justify-between'>
            <div className='items-center space-x-2 flex flex-row'>
              <CalendarDays className='h-4 w-4 text-muted-foreground' />
              <span>Rent Amount: </span>
            </div>
            <span>{rent.rent_amount}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <HandCoins className='h-4 w-4 text-muted-foreground' />
            <span>Daily Revenue: </span>
          </div>
        </CardContent>

        <CardFooter className='flex justify-between'>
          <div className='space-x-4'>
            {}
            <Button variant='outline'>Cancel</Button>
            <Button>Deploy</Button>
          </div>
          <CardTitle>Total: </CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
}
