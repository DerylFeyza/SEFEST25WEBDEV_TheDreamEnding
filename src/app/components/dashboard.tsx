import { Layout } from './layout';
import { Hero } from './hero';
import { FeaturedItems } from './featured-items';
import { RentalHistory } from './rental-history';
import { SustainabilitySection } from './sustainability-section';
import { CallToAction } from './call-to-action';
import { UserEngagement } from './user-engagement';
import { allItems } from '@/types/entities';
import { Rental } from '@prisma/client';
type ExtendedRental = Rental & { item: { name: string } };

interface DashboardProps {
  items: allItems[];
  rentalHistory: ExtendedRental[];
}

export function Dashboard({ items, rentalHistory }: DashboardProps) {
  const shuffledItems = [...items].sort(() => 0.5 - Math.random());

  return (
    <Layout>
      <Hero />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 sm:col-span-3'>
          <FeaturedItems items={shuffledItems} />
        </div>
        <div className='lg:mt-16 lg:col-span-1 sm:col-span-3'>
          <RentalHistory rentalHistory={rentalHistory} />
        </div>
        <div className='lg:col-span-3 sm:col-span-3'>
          <SustainabilitySection />
        </div>
      </div>
      <CallToAction />
      <UserEngagement />
    </Layout>
  );
}
