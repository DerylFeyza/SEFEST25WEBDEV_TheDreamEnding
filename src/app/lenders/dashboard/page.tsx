import { getBestSeller } from '@/app/utils/actions/item';
import { getDashboardStats } from '@/app/utils/actions/dashboard';
import DashboardPage from './DashboardPage';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    redirect('/auth/login');
  }

  const [bestSeller, dashboardStats] = await Promise.all([
    getBestSeller(),
    getDashboardStats(userId)
  ]);

  if (!dashboardStats) {
    throw new Error('Failed to fetch dashboard stats');
  }

  return (
    <div>
      <DashboardPage bestSeller={bestSeller} {...dashboardStats} />
    </div>
  );
}
