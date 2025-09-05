import { Schema, model, Document } from "mongoose";

// 1. Plain TS interface for your user fields
export interface User {
  fullName: string;
  email: string;
  password: string;
}

// 2. UserDocument extends both User + Mongoose's Document
export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

// 3. Define schema with typing
const userSchema = new Schema<UserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// 4. Export typed model
export const UserModel = model<UserDocument>("User", userSchema);
