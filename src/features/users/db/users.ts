import { db } from "@/server/db";
import { UserTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidateUserCache } from "./cache/users";

export async function createUser(data: typeof UserTable.$inferInsert) {
  await db.insert(UserTable).values(data).onConflictDoNothing();

  revalidateUserCache(data.id);
}

export async function updateUser(
  id: string,
  data: Partial<typeof UserTable.$inferInsert>,
) {
  await db.update(UserTable).set(data).where(eq(UserTable.id, id));

  revalidateUserCache(id);
}

export async function deleteUser(id: string) {
  await db.delete(UserTable).where(eq(UserTable.id, id));

  revalidateUserCache(id);
}
