import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET as string;

export const generateToken = (userId: string) => {
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(userId, secretKey, options);
  return token;
};

export const verifyToken = (token: string) => {
  const verifiedToken = jwt.verify(token, secretKey);
  return verifiedToken;
};
