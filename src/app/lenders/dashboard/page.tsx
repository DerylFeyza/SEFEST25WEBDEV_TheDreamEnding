import { getDashboardStats } from "@/app/utils/actions/dashboard";
import { getLatestPendingRental } from "@/app/utils/database/rental.query";
import DashboardPage from "./DashboardPage";
import { getBestSeller } from "@/app/utils/actions/item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    redirect('/auth/login');
  }

  const stats = await getDashboardStats(session?.user?.id ?? '');
  const latestPendingRental = await getLatestPendingRental(session?.user?.id ?? '');

  const bestSellerData = await getBestSeller();

  if (!stats) {
    return <div>Error loading dashboard data</div>;
  }

  return <DashboardPage {...stats} latestPendingRental={latestPendingRental} bestSeller={bestSellerData}/>;
}