import {model,Schema} from "mongoose";
import { UserDocument } from "./user.model";
const foodPartnerSchema = new Schema<UserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

  }, { timestamps: true }
)
export const FoodPartnerModel = model<UserDocument>("FoodPartner", foodPartnerSchema); 