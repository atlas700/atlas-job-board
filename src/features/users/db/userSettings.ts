import { db } from "@/server/db";
import { UserNotificationSettingsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function createUserNotificationSettings(
  data: typeof UserNotificationSettingsTable.$inferInsert,
) {
  return await db
    .insert(UserNotificationSettingsTable)
    .values(data)
    .onConflictDoNothing();
}

export async function deleteUserNotificationSettings(userId: string) {
  await db
    .delete(UserNotificationSettingsTable)
    .where(eq(UserNotificationSettingsTable.userId, userId));
}
