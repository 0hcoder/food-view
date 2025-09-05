import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";

// Create a typed router
const router: Router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/auth/logout
 * @desc    Logout user (clear cookies or token)
 * @access  Public/Private (depends on implementation)
 */
router.get("/logout", logout);

export default router;
