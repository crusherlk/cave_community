import { createServerFn } from "@tanstack/react-start";
import { db } from "#/drizzle/db";
import { UserTable } from "#/drizzle/schema";
import {
  comparePassword,
  DUMMY_SALT_STRING,
  hashPassword,
} from "./core/passwordHasher";
import {
  createUserSession,
  getUserSession,
  removeAllUserSessionsById,
} from "./core/session";
import { signinSchema, signupSchema } from "./schema";

export const signinFn = createServerFn({ method: "POST" })
  .validator(signinSchema)
  .handler(
    async ({
      data,
    }): Promise<{
      status: "success" | "error";
      message: string;
    }> => {
      const existingUser = await db.query.UserTable.findFirst({
        where: {
          email: data.email,
        },
      });

      if (existingUser == null)
        return {
          status: "error",
          message: "Invalid credentials",
        };
      try {
        const isCorrectPassword = await comparePassword({
          hashedPassword: existingUser.password,
          password: data.password,
          salt: DUMMY_SALT_STRING,
        });

        if (!isCorrectPassword) {
          return { status: "error", message: "Invalid credentials" };
        }

        // session management
        await removeAllUserSessionsById(existingUser.id);
        await createUserSession(existingUser.id);

        return { status: "success", message: "Signed in successfully!" };
      } catch {
        return { status: "error", message: "Unable to create an account" };
      }
    },
  );

export const signupFn = createServerFn({ method: "POST" })
  .validator(signupSchema)
  .handler(
    async ({
      data,
    }): Promise<{
      status: "success" | "error";
      message: string;
    }> => {
      const existingUser = await db.query.UserTable.findFirst({
        where: {
          email: data.email,
        },
      });

      if (existingUser != null)
        return {
          status: "error",
          message: "Account already exists for this email address!",
        };

      try {
        const hashedPassword = await hashPassword(
          data.password,
          DUMMY_SALT_STRING,
        );

        const [user] = await db
          .insert(UserTable)
          .values({
            name: data.name,
            email: data.email,
            password: hashedPassword,
          })
          .returning({
            id: UserTable.id,
            email: UserTable.email,
          });

        if (user == null)
          return { status: "error", message: "Unable to create an account" };

        await createUserSession(user.id);
        return { status: "success", message: "Signed up successfully!" };
      } catch {
        return { status: "error", message: "Unable to create an account" };
      }
    },
  );

export const getUserSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return await getUserSession();
  },
);
