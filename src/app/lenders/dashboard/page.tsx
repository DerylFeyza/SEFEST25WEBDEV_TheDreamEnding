import { getBestSeller } from "@/app/utils/actions/item";
import DashboardPage from "./DashboardPage";
export default async function page() {
  const result = await getBestSeller() ;
  return (
    <div>
      <DashboardPage bestSeller={result} />
    </div>
  );
}
