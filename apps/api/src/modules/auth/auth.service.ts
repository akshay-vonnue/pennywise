import { verify } from "jsonwebtoken";
import type { User } from "../../generated/prisma/client";
import { CustomError } from "../../utils/Error";
import { signToken, verifyToken } from "../../utils/jwt";
import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";

type registerServiceArgs = {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "CUSTOMER";
};

type loginServiceArgs = {
  email: string;
  password: string;
};

function toSafeUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export const registerService = async (data: registerServiceArgs) => {
  const isExistingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isExistingUser) throw new CustomError(409, "User Already exists");

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      passwordHash,
    },
  });

  return user;
};

export const loginService = async (data: loginServiceArgs) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) throw new CustomError(404, "user not found");

  const isValidPassword = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!isValidPassword) throw new CustomError(401, "invalid credentials");

  const token = signToken({ userId: user.id, role: user.role });

  return {
    user: toSafeUser(user),
    token,
  };
};

export const meService = (token: string) => {
  const user = verifyToken(token);
  return user;
};
