import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import prisma from "../utils/prisma";
import {
  loginService,
  meService,
  registerService,
} from "../modules/auth/auth.service";

beforeAll(async () => {
  await prisma.user.deleteMany();
});

describe("authentication tests", () => {
  let token: string;

  it("should register a user", async () => {
    const user = await registerService({
      name: "admin",
      email: "admin@gmail.com",
      role: "ADMIN",
      password: "123456",
    });

    expect(user.id).toBeTruthy();
  });

  it("should not register with an existing email", async () => {
    await expect(
      registerService({
        name: "admin",
        email: "admin@gmail.com",
        role: "ADMIN",
        password: "123456",
      }),
    ).rejects.toThrow();
  });

  it("it should login a user", async () => {
    const user = await loginService({
      email: "admin@gmail.com",
      password: "123456",
    });

    token = user.token;

    expect(user.token).toBeTruthy();
  });

  it("it should throw invalid credentials", async () => {
    await expect(
      loginService({
        email: "admin@gmail.com",
        password: "1234567",
      }),
    ).rejects.toThrow("invalid credentials");
  });

  it("it should throw user not found", async () => {
    await expect(
      loginService({
        email: "invalidUser@gmail.com",
        password: "123456",
      }),
    ).rejects.toThrow("user not found");
  });

  it("should verify the token", async () => {
      const res = await meService(token);
      expect(res).toBeTruthy();
  });
});
