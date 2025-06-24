import { serve } from "inngest/next";
import { inngest } from "@/services/inngest/client";
import {
  clerkCreateUserDb,
  clerkDeleteUserDb,
  clerkUpdateUserDb,
} from "@/services/inngest/function/clerk";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [clerkCreateUserDb, clerkUpdateUserDb, clerkDeleteUserDb],
});
