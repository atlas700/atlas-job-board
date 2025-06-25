import { inngest } from "@/services/inngest/client";
import {
  clerkCreateOrganizationDb,
  clerkCreateUserDb,
  clerkDeleteOrganizationDb,
  clerkDeleteUserDb,
  clerkUpdateOrganizationDb,
  clerkUpdateUserDb,
} from "@/services/inngest/function/clerk";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    clerkCreateUserDb,
    clerkUpdateUserDb,
    clerkDeleteUserDb,
    clerkCreateOrganizationDb,
    clerkUpdateOrganizationDb,
    clerkDeleteOrganizationDb
  ],
});
