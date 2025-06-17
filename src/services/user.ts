import { prisma } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";

export type CreateUserPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
};

export type CreateJWTTokenPayload = {
  email: string;
  password: string;
};

const JWT_SECRET = "super_secrete";

export class UserService {
  private static generateHashedPassword(password: string, salt: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  public static async createUser(payload: CreateUserPayload) {
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHashedPassword(
      payload.password,
      salt
    );
    return await prisma.user.create({
      data: { ...payload, salt, password: hashedPassword },
    });
  }

  private static async getUserByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }

  public static async getUserById(id: string) {
    return await prisma.user.findFirst({ where: { id } });
  }

  public static async createJWTToken(payload: CreateJWTTokenPayload) {
    const user = await UserService.getUserByEmail(payload.email);
    if (!user) throw new Error("user not found");

    const hashedPassword = UserService.generateHashedPassword(
      payload.password,
      user.salt
    );

    if (hashedPassword !== user.password) throw new Error("Incorrect Password");

    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}
