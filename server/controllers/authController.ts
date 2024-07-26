import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/authValidator";
import { createUser, findUserByEmail } from "../services/userService";

export const register = async (req: Request, res: Response) => {
  const validationResult = registerSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { name, email, password } = validationResult.data;

  try {
    const userExists = await findUserByEmail(email);
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await createUser(name, email, password);

    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration: ", error);
    res.status(400).json({ message: "Invalid user data", error: { error } });
  }
};

export const login = async (req: Request, res: Response) => {
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { email, password } = validationResult.data;
  try {
    const user = await findUserByEmail(email);

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user.id);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during user login: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
