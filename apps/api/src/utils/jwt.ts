import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export const signToken = (data: {
  userId: String;
  role: "ADMIN" | "CUSTOMER";
}) => {
  return jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: "4hr",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};
