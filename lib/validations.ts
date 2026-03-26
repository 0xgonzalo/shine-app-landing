import { z } from "zod/v4";

export const subscribeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
