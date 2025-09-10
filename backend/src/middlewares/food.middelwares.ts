import { FoodPartnerModel } from "../models/foodpartner.model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

// Middleware to authenticate Food Partner using JWT
export const authenticateFoodPartner = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
  
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
   
        const foodPartner = await FoodPartnerModel.findById(decoded.userId);
        
        if (!foodPartner) {
            return res.status(401).json({ message: "Invalid token" });
        }
        (req as any).user = foodPartner as User; // Attach user to request object
      
        next();
    }
catch (error: any) {
        res.status(401).json({ message: "Unauthorized", error : error.message as string});
    }
};
