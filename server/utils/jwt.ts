import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

if (!secretKey) throw new Error("JWT_SECRET must be defined");

export const generateToken = (userId: string) => {
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign({ userId }, secretKey, options);
  return token;
};

export const verifyToken = (token: string) => {
  const verifiedToken = jwt.verify(token, secretKey);
  return verifiedToken;
};
