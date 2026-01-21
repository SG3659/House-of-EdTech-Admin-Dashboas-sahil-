import { Router } from "express";
const router = Router();
import {
  createCarInfo,
  fetchCars,
  editCarInfo,
  fetchCarByID,
} from "../controller/cars.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import ApiRateLimiter from "../middleware/limit.js";
router.post("/createCar", ApiRateLimiter, createCarInfo);
router.get("/fetchCar", fetchCars);
router.get("/fetchCar/:id", fetchCarByID);
router.patch("/editCar/:id", ApiRateLimiter, AuthMiddleware, editCarInfo);
export default router;
