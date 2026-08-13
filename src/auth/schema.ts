import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().trim().min(1, "email address must be required!"),
  password: z.string().trim().min(1, "password must be required!"),
});

export const signupSchema = signinSchema.extend({
  name: z.string().trim().min(1, "name must be required!"),
});
