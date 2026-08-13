import { scrypt, timingSafeEqual } from "node:crypto";

export const DUMMY_SALT_STRING = "salt";

export const hashPassword = (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);

      resolve(hash.toString("hex").normalize());
    });
  });
};

export const comparePassword = async ({
  hashedPassword,
  password,
  salt,
}: {
  hashedPassword: string;
  password: string;
  salt: string;
}) => {
  const inputHashed = await hashPassword(password, salt);

  return timingSafeEqual(
    Buffer.from(inputHashed, "hex"),
    Buffer.from(hashedPassword, "hex"),
  );
};
