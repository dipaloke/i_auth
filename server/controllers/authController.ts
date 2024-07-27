import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../services/userService";

export const register = async (req: Request, res: Response) => {
  console.log("Handling /auth/register request:", req.method, req.url);
  console.log("Request body:", JSON.stringify(req.body));
  console.log("Request headers:", JSON.stringify(req.headers));

  try {
    const { name, email, password } = req.body;

    const userExists = await findUserByEmail(email);

    if (userExists) {
      console.log("User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await createUser(name, email, password);

    const token = generateToken(user.id);

    const response = {
      userId: user.id,
      email: user.email,
      access_token: token,
      // user, message: "User registered successfully"
    };
    console.log("Register response:", JSON.stringify(response));

    res.status(201).json(response);
    // res.status(201).json({ response, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration: ", error);
    res.status(500).json({ error: "Internal server error"});
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("Handling /auth/login request:", req.method, req.url);
  console.log("Request body:", JSON.stringify(req.body));
  console.log("Request headers:", JSON.stringify(req.headers));

  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      console.log("Invalid email or password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    const response = {
      userId: user.id,
      email: user.email,
      access_token: token,
      // token,
      // user: {id: user.id, name: user.name, email: user.email}
    };
    console.log("Login Response:", JSON.stringify(response));

    res.json(response);
  } catch (error) {
    console.error("Error during user login /auth/login: ", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};
