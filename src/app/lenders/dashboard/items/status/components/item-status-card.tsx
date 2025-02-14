'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { ItemWithRentalCounts } from '@/types/entities';
export default function ItemStatusCard({
  item
}: {
  item: ItemWithRentalCounts;
}) {
  return (
    <div className='container mx-auto flex flex-col space-y-4 p-4'>
      <div className='grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-8'>
        <div className='aspect-square relative flex justify-center col-span-5 transition-all duration-300 hover:shadow-lg'>
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className='object-cover rounded-lg'
          />
        </div>
        <div className='col-span-5 xl:col-span-3'>
          <div className='grid xl:grid-rows-2 gap-4 h-full'>
            <Card className='transition-all duration-300 hover:shadow-lg row-span-1'>
              <CardHeader className=''>
                <h2 className='mb-4 text-xl font-semibold'>
                  Rental Status History
                </h2>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Product Status:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Total Item:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.item_amount}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Item Available:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.item_amount -
                        Number(
                          item.rental_counts.confirmed +
                            item.rental_counts.ongoing
                        )}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Item Currently Reserved:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.rental_counts.confirmed +
                        item.rental_counts.ongoing}
                    </span>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card className='transition-all duration-300 hover:shadow-lg row-span-1'>
              <CardHeader className='p-6'>
                <h2 className='mb-4 text-xl font-semibold'>
                  Rental Status Recap
                </h2>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Pending:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.rental_counts.pending}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Confirmed:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.rental_counts.confirmed}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Ongoing:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.rental_counts.ongoing}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Completed:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.rental_counts.completed}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Cancelled:
                    </span>
                    <span className='text-sm font-semibold'>
                      {item.rental_counts.cancelled}
                    </span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      <Card className='flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-lg'>
        <div>
          <CardHeader className='p-0'>
            <CardTitle className='mb-2 text-2xl font-bold'>
              {item.name}
            </CardTitle>
            <CardTitle className='mb-2 text-xl font-semibold'>
              {item.category}
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
        </div>
      </Card>

      <Card className='p-6 transition-all duration-300 hover:shadow-lg'>
        <CardHeader className='mb-4 p-0'>
          <CardTitle className='text-2xl font-bold'>Product Details</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='grid grid-cols-1 gap-6'>
            <div className='space-y-1'>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Condition
              </h3>
              <p className='text-sm font-semibold'>{item.condition}</p>
            </div>
            <div className='space-y-1'>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Price
              </h3>
              <p className='text-sm font-semibold'>Rp {item.rent_price}/day</p>
            </div>
            <div className='space-y-1'>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Pick Up Location
              </h3>
              <p className='text-sm font-semibold'>{item.pickup_location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
