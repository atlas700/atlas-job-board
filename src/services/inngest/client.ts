import { type DeletedObjectJSON, type UserJSON } from "@clerk/nextjs/server";
import { EventSchemas, Inngest } from "inngest";

type ClerkWebhookData<T> = {
  data: {
    data: T;
    headers: Record<string, string>;
    raw: string;
  };
};

type Events = {
  "clerk/user.created": ClerkWebhookData<UserJSON>;
  "clerk/user.updated": ClerkWebhookData<UserJSON>;
  "clerk/user.deleted": ClerkWebhookData<DeletedObjectJSON>;
};

export const inngest = new Inngest({
  id: "job-board-atlas",
  schemas: new EventSchemas().fromRecord<Events>(),
});
