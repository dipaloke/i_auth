import { prisma } from "../utils/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const salt = 10;

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "User already exists" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user.id)

    res.json({token})
  } catch (error) {
    res.status(500).json({message: "server error"})
  }
};
