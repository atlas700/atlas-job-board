import { db } from "@/server/db";
import { UserNotificationSettingsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidateUserNotificationSettingsCache } from "./cache/userNotificationSettings";

export async function createUserNotificationSettings(
  data: typeof UserNotificationSettingsTable.$inferInsert,
) {
  await db
    .insert(UserNotificationSettingsTable)
    .values(data)
    .onConflictDoNothing();

  revalidateUserNotificationSettingsCache(data.userId);
}

export async function deleteUserNotificationSettings(userId: string) {
  await db
    .delete(UserNotificationSettingsTable)
    .where(eq(UserNotificationSettingsTable.userId, userId));

  revalidateUserNotificationSettingsCache(userId);
}
