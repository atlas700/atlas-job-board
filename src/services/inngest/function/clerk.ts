import { env } from "@/env";
import { inngest } from "../client";

import { Webhook } from "svix";
import { NonRetriableError } from "inngest";
import { createUser, deleteUser, updateUser } from "@/features/users/db/users";
import {
  createUserNotificationSettings,
  deleteUserNotificationSettings,
} from "@/features/users/db/userSettings";

function verifyWebhook({
  headers,
  raw,
}: {
  headers: Record<string, string>;
  raw: string;
}) {
  return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers);
}

export const clerkCreateUserDb = inngest.createFunction(
  { id: "clerk/create-db-user", name: "Clerk - Create DB User" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    await step.run("Verify Clerk Webhook", async () => {
      try {
        await verifyWebhook(event.data);
      } catch {
        throw new NonRetriableError("Invalid Clerk Webhook Signature");
      }
    });

    const userId = await step.run("Create User in DB", async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find(
        (email) => email.id === userData.primary_email_address_id,
      );

      if (!email) {
        throw new NonRetriableError("Primary email address not found for user");
      }

      await createUser({
        id: userData.id,
        email: email.email_address,
        name: `${userData.first_name} ${userData.last_name}`,
        imageUrl: userData.image_url,
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      });

      return userData.id;
    });

    await step.run("Create User Notification Settings", async () => {
      await createUserNotificationSettings({ userId });
    });
  },
);

export const clerkUpdateUserDb = inngest.createFunction(
  { id: "clerk/update-db-user", name: "Clerk - Update DB User" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    await step.run("Verify Clerk Webhook", async () => {
      try {
        await verifyWebhook(event.data);
      } catch {
        throw new NonRetriableError("Invalid Clerk Webhook Signature");
      }
    });

    await step.run("Update User in DB", async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find(
        (email) => email.id === userData.primary_email_address_id,
      );

      if (!email) {
        throw new NonRetriableError("Primary email address not found for user");
      }

      await updateUser(userData.id, {
        email: email.email_address,
        name: `${userData.first_name} ${userData.last_name}`,
        imageUrl: userData.image_url,
        updatedAt: new Date(userData.updated_at),
      });
    });
  },
);

export const clerkDeleteUserDb = inngest.createFunction(
  { id: "clerk/delete-db-user", name: "Clerk - Delete DB User" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    await step.run("Verify Clerk Webhook", async () => {
      try {
        await verifyWebhook(event.data);
      } catch {
        throw new NonRetriableError("Invalid Clerk Webhook Signature");
      }
    });

    await step.run("Delete User in DB", async () => {
      const userData = event.data.data;

      if (userData.id == null) {
        throw new NonRetriableError("There was no user id found");
      }

      await deleteUserNotificationSettings(userData.id);
      await deleteUser(userData.id);
    });
  },
);
