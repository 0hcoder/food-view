import { Router } from "express";
import { createFoodItem } from "../controllers/food.controller";
import { authenticateFoodPartner } from "../middlewares/food.middelwares";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router: Router = Router();
router.post("/",authenticateFoodPartner,upload.single("video"),createFoodItem)
export default router;