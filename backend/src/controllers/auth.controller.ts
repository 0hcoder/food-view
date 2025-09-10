import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel, UserDocument } from "../models/user.model";
import { FoodPartnerModel } from "../models/foodpartner.model";

// ----------- User REGISTER -----------
export async function register(req: Request, res: Response): Promise<void> {
  const { fullName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser: UserDocument | null = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
}

// ----------- User LOGIN -----------

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  try {
    const user: UserDocument | null = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
}

// ----------- User LOGOUT -----------
export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

// ----------- FoodPartner Register -----------
export async function foodPartnerRegister(
  req: Request,
  res: Response
): Promise<void> {
  const { fullName, email, password, restaurantName } = req.body; // Added restaurantName

  try {
    // Check if user already exists
    const existingUser: UserDocument | null = await FoodPartnerModel.findOne({
      email,
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user with role 'foodPartner'
    const newUser = new FoodPartnerModel({
      fullName,
      email,
      password: hashedPassword,
      role: "foodPartner", // Set role to foodPartner
      restaurantName, // Store restaurantName
    }); // Added restaurantName

    await newUser.save(); // Save the new user
    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({
      message: "Food Partner registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
}

// ----------- FoodPartner LOGIN -----------
export const foodPartnerLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user: UserDocument | null = await FoodPartnerModel.findOne({
      email,
    }); // Ensure role is foodPartner
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
// ----------- FoodPartner LOGOUT -----------
export const foodPartnerLogout = (req: Request, res: Response): void => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
