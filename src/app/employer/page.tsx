import { getJobListingsOrganizationTag } from "@/features/jobListings/db/cache/jobListings";
import { db } from "@/server/db";
import { JobListingTable } from "@/server/db/schema";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { desc, eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function EmployerHomePage() {
  return (
    <Suspense>
      <SuspendedPage />
    </Suspense>
  );
}

async function SuspendedPage() {
  const { orgId } = await getCurrentOrganization();

  if (orgId == null) {
    return null;
  }

  const recentJobListings = await getRecentJobListing(orgId);

  if (recentJobListings == null) {
    return redirect("employer/job-listings/new");
  } else {
    return redirect(`/employer/job-listings/${recentJobListings.id}`);
  }
}

async function getRecentJobListing(orgId: string) {
  "use cache";
  cacheTag(getJobListingsOrganizationTag(orgId));

  return await db.query.JobListingTable.findFirst({
    where: eq(JobListingTable.organizationId, orgId),
    columns: { id: true },
    orderBy: desc(JobListingTable.createdAt),
  });
}
