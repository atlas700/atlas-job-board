import { db } from "@/server/db";
import { OrganizationTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidateOrganizationCache } from "./cache/organizations";

export async function createOrganization(
  data: typeof OrganizationTable.$inferInsert,
) {
  await db.insert(OrganizationTable).values(data).onConflictDoNothing();

  revalidateOrganizationCache(data.id);
}

export async function updateOrganization(
  id: string,
  data: Partial<typeof OrganizationTable.$inferInsert>,
) {
  await db
    .update(OrganizationTable)
    .set(data)
    .where(eq(OrganizationTable.id, id));

  revalidateOrganizationCache(id);
}

export async function deleteOrganization(id: string) {
  await db.delete(OrganizationTable).where(eq(OrganizationTable.id, id));

  revalidateOrganizationCache(id);
}
