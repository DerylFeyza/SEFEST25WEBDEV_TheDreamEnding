import { getDashboardStats } from '@/app/utils/actions/dashboard';
import {
  getLatestPendingRental,
  getAllRentals
} from '@/app/utils/database/rental.query';
import DashboardPage from './DashboardPage';
import { getBestSeller } from '@/app/utils/actions/item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import type { Rental, SustainabilityImpact } from '@prisma/client';

type ExtendedRental = Rental & {
  sustainabilityImpact: SustainabilityImpact;
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    redirect('/auth/login');
  }

  const stats = await getDashboardStats(userId);
  const latestPendingRental = await getLatestPendingRental(userId);
  const bestSellerData = await getBestSeller(userId);

  const allRentals = (await getAllRentals({
    where: {
      user_id: userId,
      status: 'COMPLETED'
    },
    include: {
      sustainabilityImpact: true
    }
  })) as ExtendedRental[];

  const totalCarbonSavings = allRentals.reduce((sum, rental) => {
    return sum + (rental.sustainabilityImpact?.carbon_savings || 0);
  }, 0);

  const totalWasteReduction = allRentals.reduce((sum, rental) => {
    return sum + (rental.sustainabilityImpact?.waste_reduction || 0);
  }, 0);

  if (!stats) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <DashboardPage
      {...stats}
      latestPendingRental={latestPendingRental}
      bestSeller={bestSellerData}
      totalCarbonSavings={totalCarbonSavings}
      totalWasteReduction={totalWasteReduction}
    />
  );
}
