"use server";

import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { redirect } from "next/navigation";
import type { z } from "zod";
import { insertJobListing } from "../db/jobListings";
import { jobListingSchema } from "./schemas";

export async function createJobListing(
  unsafeData: z.infer<typeof jobListingSchema>,
) {
  const errorState = {
    error: true,
    message: "You don't have the permission to create a job listing",
  };

  const { orgId } = await getCurrentOrganization();

  if (orgId == null) return errorState;

  const { success, data } = jobListingSchema.safeParse(unsafeData);

  if (!success) return errorState;

  const createdJobListing = await insertJobListing({
    ...data,
    organizationId: orgId,
    status: "draft",
  });

  redirect(`/employer/job-listings/${createdJobListing.id}`);
}

