import { getUserIdTag } from "@/features/users/db/cache/users";
import { db } from "@/server/db";
import { UserTable } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

export async function getCurrentUser({ allData = false } = {}) {
  const { userId } = await auth();

  return {
    userId,
    user: allData && userId != null ? await getUser(userId) : undefined,
  };
}

async function getUser(userId: string) {
  "use cache";
  cacheTag(getUserIdTag(userId));

  return db.query.UserTable.findFirst({ where: eq(UserTable.id, userId) });
}
