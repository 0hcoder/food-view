import { Request, Response } from "express";
import { FoodModel } from "../models/food.model";
import { FoodPartnerModel } from "../models/foodpartner.model";
import { upload } from "../services/storage.service";
import uuid from "uuid";
// Create a new food item
export const createFoodItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, category } = req.body;
    const video = req.file;
    if (!name || !description || !price || !category || !video) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const { _id } = (req as any).user; 
    const fileUpload = await upload({
      file: video.buffer,
      fileName: `${uuid.v4()}-${video.originalname}`,
    });
    const foodPartner = await FoodPartnerModel.findById(_id);
    if (!foodPartner) {
      res.status(404).json({ message: "Food Partner not found" });
      return;
    }
    let videoUrl = "demo";
    const newFoodItem = new FoodModel({
      name,
      description,
      price,
      foodPartner: _id,
      category,
      videoUrl,
    });
    await newFoodItem.save();
    res
      .status(201)
      .json({
        message: "Food item created successfully",
        foodItem: newFoodItem,
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get all food items for a specific food partner
