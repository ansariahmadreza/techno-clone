import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
});

export type RegisterFormData2 = z.infer<typeof userSchema>;
