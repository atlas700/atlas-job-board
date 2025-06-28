import { getJobListingsIdTag } from "@/features/jobListings/db/cache/jobListings";
import { db } from "@/server/db";
import { JobListingTable } from "@/server/db/schema";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { and, eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { Suspense } from "react";

type Props = {
  params: Promise<{ jobListingId: string }>;
};

export default async function JobListingPage(props: Props) {
  return (
    <Suspense>
      <SuspendedPage {...props} />
    </Suspense>
  );
}

async function SuspendedPage({ params }: Props) {
  const { orgId } = await getCurrentOrganization();

  if (orgId == null) return null;

  const { jobListingId } = await params;

  const jobListing = await getJobListing({
    jobListingId,
    orgId,
  });

  if (jobListing == null) return null;

  return <div className="@container mx-auto max-w-6xl space-y-6 p-4">
    {/* TODO: Continue from here, last checkpoint */}
  </div>;
}

async function getJobListing({
  jobListingId,
  orgId,
}: {
  jobListingId: string;
  orgId: string;
}) {
  "use cache";
  cacheTag(getJobListingsIdTag(jobListingId));

  return await db.query.JobListingTable.findFirst({
    where: and(
      eq(JobListingTable.id, jobListingId),
      eq(JobListingTable.organizationId, orgId),
    ),
  });
}
