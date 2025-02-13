import { Layout } from "./layout";
import { FeaturedItems } from "./featured-items";
import { RentalHistory } from "./rental-history";
import { SustainabilitySection } from "./sustainability-section";
import { CallToAction } from "./call-to-action";
import { UserEngagement } from "./user-engagement";

export function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <FeaturedItems />
        </div>
        <div className="mt-12">
          <RentalHistory />
        </div>
        <div className="col-span-3">
          <SustainabilitySection />
        </div>
      </div>
      <CallToAction />
      <UserEngagement />
    </Layout>
  );
}
