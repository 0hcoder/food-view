import { Schema, model } from "mongoose";
export interface FoodDocument {
  name: string;
  description: string;
  price: number;
  category: string;
  videoUrl: string;
  foodPartner: Schema.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}
const foodSchema = new Schema<FoodDocument>(
  {
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    videoUrl: { type: String, required: true },
      foodPartner: {
        type: Schema.Types.ObjectId,
        ref: "foodpartner"
    },
    },
    { timestamps: true }
);
export const FoodModel = model<FoodDocument>("Food", foodSchema);