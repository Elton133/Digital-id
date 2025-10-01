import bcrypt from "bcryptjs";
import User from "../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword, fullName });
    res.status(201).json(user);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ error: errorMessage });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {id: user._id, email: user.email }, process.env.JWT_SECRET || "supersecret", { expiresIn: "1h" }
    )
    const { password: _, ...safeUser } = user.toObject();
   res.status(200).json({ user: safeUser, token });

  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
};
