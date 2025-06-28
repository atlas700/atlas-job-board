import type { z } from "zod";
import type { jobListingSchema } from "./schemas";

export async function createJobListing(unsafeData: z.infer<typeof jobListingSchema>){
    return null
}

export async function updateJobListing(id: string, unsafeData: z.infer<typeof jobListingSchema>){
return null
}