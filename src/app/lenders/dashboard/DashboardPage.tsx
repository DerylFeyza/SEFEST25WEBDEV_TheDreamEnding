'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Users, Filter, ClipboardList, DollarSign, Plus, List } from 'lucide-react';
import Link from 'next/link';
import { Item, Review, User } from '@prisma/client';
import Image from 'next/image';
import { formatToIDR } from '@/helper/formatToIDR';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface bestSeller {
  bestSeller: Item[] & { reviews: Review[] & { user: User }[] }[];
}

interface DashboardStats {
  totalRevenue: string;
  totalOngoingRent: number;
  totalItems: number;
  totalOrders: number;
  summaryRevenue: { date: string; revenue: number }[];
}

interface DashboardPageProps extends bestSeller, DashboardStats {}

export default function DashboardPage({ bestSeller, summaryRevenue, totalRevenue, totalOngoingRent, totalItems, totalOrders }: DashboardPageProps) {
  const chartData = {
    labels: summaryRevenue.map(item => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: summaryRevenue.map(item => item.revenue),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Summary Revenue'
      }
    }
  };

  return (
    <div className='bg-background min-h-screen p-6 space-y-6'>
      {/* Stats Cards */}
      <div className='md:grid-cols-4 grid grid-cols-1 gap-4'>
        <Card className='bg-primary text-primary-foreground p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='opacity-80 text-sm'>Total sales</p>
              <p className='text-2xl font-bold'>{formatToIDR(Number(totalRevenue))}</p>
            </div>
            <DollarSign className='opacity-80' />
          </div>
        </Card>
        <Card className='bg-primary text-primary-foreground p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='opacity-80 text-sm'>Ongoing Rent</p>
              <p className='text-2xl font-bold'>{totalOngoingRent}</p>
            </div>
            <Users className='opacity-80' />
          </div>
        </Card>
        <Card className='bg-primary text-primary-foreground p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='opacity-80 text-sm'>Total Items</p>
              <p className='text-2xl font-bold'>{totalItems}</p>
            </div>
            <Filter className='opacity-80' />
          </div>
        </Card>
        <Card className='bg-primary text-primary-foreground p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='opacity-80 text-sm'>Total orders</p>
              <p className='text-2xl font-bold'>{totalOrders}</p>
            </div>
            <ClipboardList className='opacity-80' />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className='md:grid-cols-2 grid gap-6'>
        {/* Chart */}
        <Card className='p-6'>
          <div className='flex items-start justify-between mb-4'>
            <div>
              <h2 className='text-lg font-semibold'>Summary Revenue</h2>
              <p className='text-muted-foreground text-sm'>
                Last update last week
              </p>
            </div>
            <div className='flex gap-2'>
              <span className='text-primary flex items-center gap-1 text-sm'>
                <ArrowUpRight className='w-4 h-4' /> 23.22%
              </span>
              <span className='text-destructive text-sm'>3.31%</span>
            </div>
          </div>
          <div className='mt-4 h-[300px]'>
            <Line data={chartData} options={chartOptions} />
          </div>
        </Card>

        {/* Right Side Content */}
        <div className='space-y-6'>
          {/* Product Actions */}
          <Card className='bg-accent p-6'>
            <div className='space-y-4'>
              <h3 className='text-accent-foreground text-lg font-semibold'>
                Product Management
              </h3>
              <div className='lg:flex-row flex flex-col gap-4'>
                <Button className='flex-1'>
                  <Plus className='w-4 h-4 mr-2' />
                  <Link href='/lenders/dashboard/items/add'>
                    Add New Product
                  </Link>
                </Button>
                <Button variant='outline' className='flex-1' asChild>
                  <Link href='/lenders/dashboard/items'>
                    <List className='w-4 h-4 mr-2' /> View All Products
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Best Seller */}
          <Card className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-semibold'>Best Seller</h3>
              <ArrowRight className='text-muted-foreground w-5 h-5' />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              {bestSeller.map((product, index) => (
                <div key={index} className='space-y-2'>
                  <div className='aspect-square bg-muted rounded-lg'>
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={200}
                      height={200}
                      className='h-[200px] w-[200px] rounded-lg object-cover'
                    />
                  </div>
                  <h4 className='text-sm font-medium'>{product.name}</h4>
                  <p className='text-muted-foreground text-sm'>
                    {formatToIDR(product.rent_price)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
