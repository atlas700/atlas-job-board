import { db } from "@/server/db";
import { UserNotificationSettingsTable } from "@/server/db/schema";

export async function createUserNotificationSettings(data: typeof UserNotificationSettingsTable.$inferInsert) {
  return await db.insert(UserNotificationSettingsTable).values(data).onConflictDoNothing();
}
