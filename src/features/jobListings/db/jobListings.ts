import { db } from "@/server/db";
import { JobListingTable } from "@/server/db/schema";
import { revalidateJobListingsCache } from "./cache/jobListings";

export async function insertJobListing(
  data: typeof JobListingTable.$inferInsert,
) {
  const [insertedJobListing] = await db
    .insert(JobListingTable)
    .values(data)
    .returning({
      id: JobListingTable.id,
      organizationId: JobListingTable.organizationId,
    });

    if(!insertedJobListing) {
      throw new Error("Failed to insert job listing");
    }

  revalidateJobListingsCache(insertedJobListing);

  return insertedJobListing;
}
