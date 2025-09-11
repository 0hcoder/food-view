import { Router } from "express";
import { createFoodItem, getFoodItem } from "../controllers/food.controller";
import { authenticateFoodPartner, authenticateUser } from "../middlewares/food.middelwares";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router: Router = Router();
router.post("/",authenticateFoodPartner,upload.single("video"),createFoodItem)
router.get("/",authenticateUser,getFoodItem)
export default router;