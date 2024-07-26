import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../utils/db";

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};
